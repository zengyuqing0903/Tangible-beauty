var express = require('express');
var router = express.Router();

const runSql = require('../mysql');
const { getToken, checkToken } = require('../src/token');
// let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTU3NDkzNDk1NCwiZXhwIjoxNTc3NjEzMzU0fQ.PQu7Dzp4MsurerTMR-wYSITeWKxGoo_aH_002CeEzqg';


/**
 * 获取信箱内容
 * GET
 * 接收参数:
 */
router.get('/', function (req, res, next) {
    let token = req.header('token');
    checkToken(token, (result) => {
        if (result.status !== 0) {
            res.json(result);
        } else {
            let uid =result.data.uid;
            
            runSql(`select pletter.*,user.uimage,user.uname from pletter,user where pletter.isSend = ? and pletter.touid=? and user.uid=pletter.uid`, [1,uid], (result1) => {
                // console.log(result1);
                res.json(result1);
            });
        }
    });
});
/**
 * 展示信箱具体内容
 * GET
 * 接收参数:
 *      pid:信件id
 */
router.get('/showmail', function (req, res, next) {
    let {pid} = req.query;
    // console.log(pid);
    let token = req.header('token');
    checkToken(token, (result) => {
        if (result.status !== 0) {
            res.json(result);
        } else {
            let uid = result.data.uid;
            runSql(`select pletter.*,paper.ppimage from pletter,paper where isSend = ? and touid=? and pid=? and paper.ppid=pletter.ppid`, [1,uid,pid], (result1) => {
                // console.log(result1);
                res.json(result1);
            });
        }
    });
});
/**
 * 点击收藏标识收藏信件
 * GET
 * 接收参数:
 *      pid:信件id
 */
router.get('/collect', function (req, res, next) {
    let {pid} = req.query;
    let token = req.header('token');
    // console.log(pid);
    checkToken(token, (result) => {
        if (result.status !== 0) {
            res.json(result);
        } else {
            let uid = result.data.uid;
            runSql(`update pletter set isCollection=? where isSend = ? and touid=? and pid=?`, [1,1,uid,pid], (result1) => {
                // console.log(result1);
                res.json(result1);
            });
        }
    });
});
/**
 * 彻底删除信箱信件
 * POST
 * 接收参数:
 *     pid：信件id
 * 返回参数：
 *      status: 0,
 *      message: 'OK',
 */
router.post('/deletemail', function (req, res, next) {
    let {pid} = req.body;
    let token = req.header('token');
    checkToken(token, (result) => {
        if (result.status !== 0) {
            res.json(result);
        } else {
            let uid = result.data.uid;
            runSql(`update pletter set touid=null,isSend=0 where pid=?`,[pid], (result1) => {
                // console.log(result1);
                res.json(result1);
            });
        }
    });
});

/**
 * 搜索信箱信件
 * get
 * 接收参数:
 *     ptitle：信件title
 * 返回参数：
 *      status: 0,
 *      message: 'OK',
 */
router.get('/searchmail', function (req, res, next) {
    let {ptitle} = req.query;
    let inputTitle = "%"+ptitle+"%";
    let token = req.header('token');
    checkToken(token, (result) => {
        if (result.status !== 0) {
            res.json(result);
        } else {
            let uid = result.data.uid;
            runSql(`select pletter.*,paper.ppimage,user.uimage,user.uname from pletter,paper,user where isSend = ? and touid=? and ptitle like ? and paper.ppid=pletter.ppid and user.uid=pletter.uid`, [1,uid,inputTitle], (result1) => {
                console.log(result1);
                res.json(result1);
            });
        }
    });
});
/**
 * 获取发送信件内容
 * 请求方式：
 *      GET
 * 获取参数：
 *      pid：信件id
 */
router.get('/getsendletter',function(req,res,next){
    let {pid} = req.query;
    let token = req.header('token');
    checkToken(token,(result)=>{
        if(result.status!==0){
            res.json(result);
        }else{
            console.log("skos");
            runSql(`select * from pletter where pid=?`,[pid],(result1)=>{
                console.log(result1);
                res.json(result1);
            })
        }
    })
})
/**
 * 信件发送
 * 请求方式：
 *      POST
 * 接收参数：
 *      pid：信件id
 *      phone：手机号码
 */
router.post('/sendletter',function(req,res,next){
    let{pid,phone} = req.body;
    let token = req.header('token')
    checkToken(token,(result)=>{
        if(result.status !== 0){
            res.json(result);
        }else{
            runSql(`select uid from user where uphone =?`,[phone],(result1)=>{
                if(result1.data.length > 0){
                    let toUid = result1.data[0].uid;
                    runSql(`update pletter set toUid=?,isSend=1 where pid=?`,[toUid,pid],(result2)=>{
                        res.json(result2);
                    })
                }else{
                    res.json({status:1});
                }
            })
        }
    })
})
module.exports = router;
