var express = require('express');
var router = express.Router();

const runSql = require('../mysql');

const sendMsg = require('../src/user/message');
const { getToken, checkToken } = require('../src/token');
/**
 * 获取个人信息
 * GET
 * 接收参数:
 *      
 * 返回参数：
 */
 router.get('/', function (req, res, next) {
    let token = req.header('token');
    checkToken(token, (result) => {
        let uid = result.data.uid;
        if (result.status !== 0) {
            res.json(result);
        } else {
            let uid = result.data.uid;
            runSql(`select user.* from user where uid=?`,[uid],(result)=>{
                res.json(result1);
            })
        }
    });
});
/**
 * 修改昵称
 * 请求方式：
 *      POST
 * 接收参数：
 *      uname：用户名
 * 返回参数：
 * 
 */
 router.post('/changename', function (req, res, next) {
    let {uname}=req.body;
    let token = req.header('token');
    checkToken(token, (result) => {
        let uid = result.data.uid;
        if (result.status !== 0) {
            res.json(result);
        } else {
            runSql(`update user set uname=? where uid=?`,[uname,uid],(result1)=>{
                res.json(result1);
            })
        }
    });
});
/**
 * 头像上传
 */
 router.post('/head', function(req, res){
    let token = req.header('token');
    checkToken(token, (result) => {
        if (result.status !== 0) {
            res.json(result);
        } else { 
            var form = new multiparty.Form();
            form.parse(req, function(err, fields, files){
                //将前台传来的base64数据去掉前缀
                var imgData = req.body.src.replace(/^data:image\/\w+;base64,/, '');
                var dataBuffer = new Buffer.from(imgData, 'base64');
                //写入文件
                var name = getTimestamp_13()+'_'+getRandom(2)+'.png';
                var picPath = path.join(__dirname,'../public/head/'+name);
                fs.writeFile(picPath, dataBuffer, function(err){
                    if(err){
                        console.log(err);
                        res.send(err);
                    }else{
                        res.send(name);
                    }
                });
            });
        }
    })
});
/**
 * 更换头像
 */
router.post('/changehead', function (req, res, next) {
    let {name} = req.body;
    let token = req.header('token');
    // console.log(token);
    checkToken(token, (result) => {
        if (result.status !== 0) {
            res.json(result);
        } else {   
            let uid = result.data.uid;
            runSql(`update user set uimage=? where uid=?`, [name,uid], (result) => {
                res.json(result);
            });
        }
    });
});
/**
 * 获取旧密码
 * 请求方式：
 *      GET
 * 接收参数：
 * 返回参数：
 *      
 */
 router.get('/getoldpwd',function(req,res,next){
    let token = req.header('token');
    checkToken(token,(result)=>{
        if(result.status != 0){
            res.json(result);
        }else{
            let uid = result.data.uid;
            runSql(`select upassword from user where uid=? `,[uid],(result1)=>{
                // console.log(result1);
                res.json(result1);
            })
        }
    })
})
/**
 * 修改密码
 * 请求方式：
 *      POST
 * 接收参数：
 *      newpwd：用户新密码
 * 返回参数：
 *      
 */
 router.post('/changepwd',function(req,res,next){
    let{newpwd} = req.body;
    let token = req.header('token');
    checkToken(token,(result)=>{
        if(result.status != 0){
            res.json(result);
        }else{
            let uid = result.data.uid;
            runSql(`update user set upassword=? where uid=?`,[newpwd,uid],(result2)=>{
                 res.json(result2);
            })                  
        }
    })
})

/**
 * 获取粉丝数
 * 请求方式：
 *      GET
 * 接收参数：
 * 返回参数：
 *      num:粉丝数
 */
router.get('/fans',function(req,res,next){
    let {uid} = req.query;
    let token = req.header('token');
    var uu;
    checkToken(token,(result)=>{
        if(result.status!==0){
            res.json(result);
        }else{
            uu = uid ||result.data.uid;
            runSql(`select COUNT(fanUid) as num from attention where uid=?`,[uu],(result1)=>{
                console.log(result1)
                res.json(result1);
            })
        }
    })
})
/**
 * 获取关注数
 * 请求方式：
 *      GET
 * 接收参数：
 * 返回参数：
 *      num:粉丝数
 */
router.get('/attentions',function(req,res,next){
    let {uid} = req.query;
    let token = req.header('token');
    var uu;
    checkToken(token,(result)=>{
        if(result.status!==0){
            res.json(result);
        }else{
            uu = uid || result.data.uid;
            console.log(uu);
            runSql(`select COUNT(uid) as num from attention where fanUid=?`,[uu],(result1)=>{
                console.log(result1)
                res.json(result1);
            })
        }
    })
})
/**
 * 查看关注列表
 * 请求方式：
 *      GET
 * 接收参数：
 * 返回参数：
 * 
 */
router.get('/attentionlist',function(req,res,next){
    let {uid} = req.query;
    let token = req.header('token');
    checkToken(token,(result)=>{
        if(result.status!==0){
            res.json(result);
        }else{
            let uu =uid || result.data.uid;
            runSql(`select distinct user.*,attention.attention from user,attention where user.uid=attention.uid and fanUid=?`,[uu],(result1)=>{
                res.json(result1);
            })
        }
    })
})
/**
 * 查看粉丝列表
 * 请求方式：
 *      GET
 * 接收参数：
 * 返回参数：
 * 
 */
router.get('/fanslist',function(req,res,next){
    let {uid} = req.query;
    let token = req.header('token');
    checkToken(token,(result)=>{
        if(result.status!==0){
            res.json(result);
        }else{
            let uu =uid || result.data.uid;
            runSql(`select distinct user.* ,attention.attention from user,attention where user.uid=attention.fanUid and attention.uid=?`,[uu],(result1)=>{
                res.json(result1);
            })
        }
    })
})
/**
 * 获取他人信息
 * 请求方式：
 *      GET
 * 接受参数：
 *      uid：用户id
 * 返回参数：
 * 
 */
 router.get('/myself',function(req,res,next){
    let {uid} = req.query;
    let token = req.header('token');
    checkToken(token,(result)=>{
        if(result.status !== 0){
            res.json(result);
        }else{
            runSql(`select * from user where uid=?`,[uid],(result1)=>{
                res.json(result1);
            })
        }
    })
})
/**
 * 查看收藏列表
 * 请求方式：
 *      GET
 * 接受参数：
 *      
 */
router.get('/collectlist',function(req,res,next){
    let token = req.header('token');
    checkToken(token,(result)=>{
        if(result.status !== 0){
            res.json(result);
        }else{
            let uid=result.data.uid;
            runSql(`select postcontent.*,user.uname,user.uimage from collect,postcontent,user where collect.uid=? and (collect.pid=postcontent.pid) and (collect.uid=user.uid)`,[uid],(result1)=>{
                // console.log(result1);
                res.json(result1);
            })
        }
    })
})
/**
 * 查看作品列表
 * 请求方式：
 *      GET
 * 接受参数：
 *      
 */
router.get('/compositionlist',function(req,res,next){
    let token = req.header('token');
    checkToken(token,(result)=>{
        if(result.status !== 0){
            res.json(result);
        }else{
            let uid=result.data.uid;
            runSql(`select postcontent.*,user.uname,user.uimage from postcontent,user where postcontent.uid=? and (postcontent.uid=user.uid)`,[uid],(result1)=>{
                res.json(result1);
            })
        }
    })
})
/**
 * 查看喜欢列表
 * 请求方式：
 *      GET
 * 接受参数：
 *      
 */
 router.get('/likelist',function(req,res,next){
    let token = req.header('token');
    checkToken(token,(result)=>{
        if(result.status !== 0){
            res.json(result);
        }else{
            let uid=result.data.uid;
            runSql(`select postcontent.*,user.uname,user.uimage from postcontent,user,likes where likes.luid=? (postcontent.uid=likes.luid) and (likes.luid=user.uid)`,[uid],(result1)=>{
                res.json(result1);
            })
        }
    })
})
module.exports = router;