var express = require('express');
var router = express.Router();

const runSql = require('../mysql');

const sendMsg = require('../src/user/message');
const { getToken, checkToken } = require('../src/token');


/**
 * 获取推荐内容
 * GET
 * 接收参数：
 *  
 * 返回参数：
 *      
 */
router.get('/recommend',function(req,res,next){
    let token = req.header('token');
    checkToken(token, (result) => {
        if (result.status !== 0) {
            res.json(result);
        } else {
            runSql(`select postcontent.*,user.uname,user.uimage from postcontent,user where (postcontent.uid=user.uid)`,[],(result)=>{
                res.json(result);
            })
        }
    })
    
})
/**
 * 获取美食内容
 * GET
 * 接收参数：
 *      gourmet:美食
 * 返回参数：
 *      
 */
router.get('/gourmet',function(req,res,next){
    let token = req.header('token');
    let {gourmet} = req.query;
    checkToken(token, (result) => {
        if (result.status !== 0) {
            res.json(result);
        } else {
            runSql(`select postcontent.*,user.uname,user.uimage from postcontent,user where ptype=? and (postcontent.uid=user.uid)`,[gourmet],(result)=>{
                console.log(result.data);
                res.json(result);
            })
    }
    })
})
/**
 * 获取穿搭内容
 * GET
 * 接收参数：
 *   chuanda:穿搭
 * 返回参数：
 *      
 */
router.get('/outfit',function(req,res,next){
    let token = req.header('token');
    let {chuanda} = req.query;
    checkToken(token, (result) => {
        if (result.status !== 0) {
            res.json(result);
        } else {
            runSql(`select postcontent.*,user.uname,user.uimage from postcontent,user where ptype=? and (postcontent.uid=user.uid)`,[chuanda],(result)=>{
                console.log(result.data);
                res.json(result);
            })
    }
    })
})
/**
 * 获取旅行内容
 * GET
 * 接收参数：
 *    lvxing:旅行
 * 返回参数：
 *      
 */
router.get('/travel',function(req,res,next){
    let token = req.header('token');
    let {lvxing} = req.query;
    checkToken(token, (result) => {
        if (result.status !== 0) {
            res.json(result);
        } else {
            runSql(`select postcontent.*,user.uname,user.uimage from postcontent,user where ptype=? and (postcontent.uid=user.uid)`,[lvxing],(result)=>{
                console.log(result.data);
                res.json(result);
            })
    }
    })
})
/**
 * 获取健身内容
 * GET
 * 接收参数：
 *   jianshen:健身
 * 返回参数：
 *      
 */
router.get('/fitness',function(req,res,next){
    let token = req.header('token');
    let {jianshen} = req.query;
    checkToken(token, (result) => {
        if (result.status !== 0) {
            res.json(result);
        } else {
            runSql(`select postcontent.*,user.uname,user.uimage from postcontent,user where ptype=? and (postcontent.uid=user.uid)`,[jianshen],(result)=>{
                console.log(result.data);
                res.json(result);
            })
    }
    })
})
/**
 * 获取科技内容
 * GET
 * 接收参数：
 *   keji:科技
 * 返回参数：
 *      
 */
router.get('/technology',function(req,res,next){
    let token = req.header('token');
    let {keji} = req.query;
    checkToken(token, (result) => {
        if (result.status !== 0) {
            res.json(result);
        } else {
            runSql(`select postcontent.*,user.uname,user.uimage from postcontent,user where ptype=? and (postcontent.uid=user.uid)`,[keji],(result)=>{
                console.log(result.data);
                res.json(result);
            })
    }
    })
})
/**
 * 获取自然科学内容
 * GET
 * 接收参数：
 *   kexue:科学
 * 返回参数：
 *      
 */
router.get('/natural',function(req,res,next){
    let token = req.header('token');
    let {kexue} = req.query;
    checkToken(token, (result) => {
        if (result.status !== 0) {
            res.json(result);
        } else {
            runSql(`select postcontent.*,user.uname,user.uimage from postcontent,user where ptype=? and (postcontent.uid=user.uid)`,[kexue],(result)=>{
                
                res.json(result);
            })
    }
    })
})
/**
 * 浏览界面
 * 请求方式：
 *      GET
 * 接受参数：
 *      pid：视频id
 * 返回参数：
 *      
 */
router.get('/browse',function(req,res,next){
    let {pid} = req.query;
    checkToken(token, (result) => {
        if (result.status !== 0) {
            res.json(result);
        } else {
            runSql(`select * from postcontent where pid=?`,[pid],(result)=>{
                res.json(result);
            })
        }
    })
})
/**
 * 查看是否点赞
 * 请求方式：
 *      GET
 * 接受参数：
 *      pid：作品id
 * 返回参数：
 */
router.get('/islike',function(req,res,next){
    let {pid} = req.query;
    checkToken(token, (result) => {
        if (result.status !== 0) {
            res.json(result);
        } else {
            let uid = result.data[0].uid;
            runSql(`select * from likes where pid=? and luid=?`,[pid,uid],(result)=>{
                res.json(result);
            })
        }
    })
})

/**
 * 获取点赞数
 * 请求方式：
 *      GET
 * 接收参数：
 *      pid：视频id
 * 返回参数：
 */
 router.get('/likenum',function(req,res,next){
    let {pid} = req.query;
    let token = req.header('token');
    checkToken(token, (result) => {
        if (result.status !== 0) {
            res.json(result);
        } else {
            runSql(`select count(luid) as num from likes where pid=?`,[pid],(result)=>{
                res.json(result.data);
            })
    }
    })
})
/**
 * 点赞
 * 请求方式：
 *      POST
 * 接收参数：
 *      pid：视频id
 * 返回参数：
 * 
 */
router.post('/like',function(req,res,next){
    let {pid,lday} = req.body;
    let token = req.header('token');
    checkToken(token, (result) => {
        if (result.status !== 0) {
            res.json(result);
        } else {
            let luid = result.data.uid;
            runSql(`select uid from postcontent where pid=?`,[pid],(result)=>{
                let touid = result.data[0].uid;
                runSql(`insert into likes(touid,luid,pid,likeday) values(?,?,?,?)`,[touid,luid,pid,lday],(result1)=>{
                    res.json(result1)
                })
            })
    }
    })
})
/**
 * 取消点赞
 * 请求方式：
 *      POST
 * 接受参数：
 *      pid：信件id
 * 
 */
 router.post('/cancelLikes', function (req, res, next) {
    let {pid} = req.query;
    let token = req.header('token');
    checkToken(token, (result) => {
        if (result.status !== 0) {
            res.json(result);
        } else {
            let uid = result.data.uid;
            runSql(`delete from likes where luid=? and pid=?`,[uid,pid],(result1)=>{
                res.json(result1);
            })
        }
    });
});
/**
 * 判断是否关注
 * 请求方式：
 *      GET
 * 接收参数：
 *      uid：发布者用户id
 * 返回参数：
 * 
 */
router.get('/isattention',function(req,res,next){
    let {uid} = req.query;
    let token = req.header('token');
    checkToken(token, (result) => {
        if (result.status !== 0) {
            res.json(result);
        } else {
            let fanUid = result.data.uid;
            runSql(`select attention from attention where uid=? and fanuid=?`,[uid,fanUid],(result)=>{
                let attenton = result.data.length;
                res.json(attenton);//0 -- 没关注                
            })
    }
    })
})
/**
 * 关注
 * 请求方式：
 *      POST
 * 接收参数：
 *      uid：被关注者uid
 * 返回参数：
 */
/**
 * attention
 *      0:单向关注
 *      1：互相关注
 */
 router.post('/attention',function(req,res,next){
    let {uid} = req.body;
    let token = req.header('token');
    checkToken(token,(result)=>{
        if(result.status !== 0){
            res.json(result);
        }else{
            let fanUid = result.data.uid;
            runSql(`select * from attention where uid=? and fanUid=?`,[fanUid,uid],(result1)=>{
                console.log(result1.data[0])
                //他已经关注我
                if(result1.data[0]){
                    runSql(`insert into attention(uid,fanUid,attention) value(?,?,1)`,[uid,fanUid],(result2)=>{
                        console.log(fanUid,uid)
                        runSql(`update attention set attention=? where  uid=? and fanUid=?`,[1,fanUid,uid],(result3)=>{
                            console.log(result3);
                            res.json(result3);
                        })
                    })
                }else{
                    //他未关注我
                    runSql(`insert into attention(uid,fanUid) value(?,?)`,[uid,fanUid],(result2)=>{
                        res.json(result2);
                    })
                }
            })
        }
    })
})
/**
 * 取消关注/移除粉丝
 * 请求方式：
 *      POST
 * 接收参数：
 *      deluid：被取消关注的uid
 * 返回参数：
 * 
 */
router.post('/delattention',function(req,res,next){
    let {deluid} = req.body;
    let token = req.header('token');
    checkToken(token,(result)=>{
        if(result.status !== 0){
            res.json(result);
        }else{
            let uid = result.data.uid;
            runSql(`select * from attention where uid=? and fanUid=?`,[uid,deluid],(result1)=>{
                //关注
                if(result1.data[0]){
                    runSql(`update attention set attention=? where uid=? and fanUid=?`,[0,uid,deluid],(result2)=>{
                        runSql(`delete from attention where uid=? and fanUid=?`,[deluid,uid],(result3)=>{
                            res.json(result3);
                        })
                    })
                }else{
                    runSql(`delete from attention where uid=? and fanUid=?`,[deluid,uid],(result3)=>{
                        res.json(result3);
                    })
                }
            })
        }
    })
})
/**
 * 收藏
 * 请求方式：
 *      POST
 * 接收参数：
 *      pid：作品id
 */
router.post('/collect',function(req,res,next){
    let {pid} = req.body;
    let token = req.header('token');
    checkToken(token,(result)=>{
        if(result.status !== 0){
            res.json(result);
        }else{
            let uid = result.data.uid;
            runSql(`insert into collect(pid,uid) values(?,?)`,[pid,uid],(result)=>{
                res.json(result);
            })
        }
    })
})
/**
 * 取消收藏
 * 请求方式：
 *      POST
 * 接受参数：
 *      pid：作品id
 */
 router.post('/cancelCollect',function(req,res,next){
    let {pid} = req.body;
    let token = req.header('token');
    checkToken(token,(result)=>{
        if(result.status !== 0){
            res.json(result);
        }else{
            let uid = result.data.uid;
            runSql(`delete from collect where uid=? and pid=?`,[uid,pid],(result)=>{
                res.json(result);
            })
        }
    })
})
/**
 * 查看是否收藏
 * 请求方式：
 *      GET
 * 接受参数：
 *      pid：作品id
 * 返回参数：
 */
 router.get('/iscollect',function(req,res,next){
    let {pid} = req.query;
    checkToken(token, (result) => {
        if (result.status !== 0) {
            res.json(result);
        } else {
            let uid = result.data.uid;
            runSql(`select * from collect where pid=? and uid=?`,[pid,uid],(result)=>{
                res.json(result);
            })
        }
    })
})
/**
 * 删除作品
 * 请求方式：
 *      POST
 * 接受参数：
 *      pid：作品id
 * 
 */
router.post('/deleteworks',function(req,res,next){
    let {pid} = req.body;
    checkToken(token, (result)=>{
        if (result.status !== 0) {
            res.json(result);
        } else {
            let uid = result.data.uid;
            runSql(`delete from postcontent where pid=?`,[pid],(result3)=>{
                runSql(`delete from likes where luid=? and pid=?`,[uid,pid],(result)=>{
                    runSql(`delete from comment where uid=? and pid=?`,[uid,pid],(result1)=>{
                        res.json(result1);
                    })
                })
            })
                
        }
    })
})
module.exports = router;
