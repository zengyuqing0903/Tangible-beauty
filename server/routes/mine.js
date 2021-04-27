var express = require('express');
var router = express.Router();

const runSql = require('../mysql');
const { getToken, checkToken } = require('../src/token');

// let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTU3NDkzNDk1NCwiZXhwIjoxNTc3NjEzMzU0fQ.PQu7Dzp4MsurerTMR-wYSITeWKxGoo_aH_002CeEzqg';
/**
 * 获取个人信息+写信数
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
            runSql(`select user.Uid,user.Uname,user.Uimage,user.Ufraction,user.Uday,user.toNick,user.Signature,user.Uphone,count(pletter.Pid) as pidnum from user,pletter where user.uid =? and user.uid=pletter.uid`,
            [uid],(result1)=>{
                res.json(result1);
                }
            )
        }
    });
});
/**
 * 获取个人信息中分享数
 * GET
 * 接收参数:
 * 返回参数：
 */
router.get('/sharenum', function (req, res, next) {
    let token = req.header('token');
    checkToken(token, (result) => {
        let uid = result.data.uid;
        if (result.status !== 0) {
            res.json(result);
        } else {
            runSql(`select count(pletter.isSend) as sharenum from user,pletter where user.uid =? and user.uid=pletter.uid and isSend=1`,
            [uid],(result1)=>{
                res.json(result1);
                }
            )
        }
    });
});

/**
 * 获取回收站信件(来自私密写)
 * GET
 * 接收参数:
 *     
 * 返回参数：
 *      status: 0,
 *      message: 'OK',
 */
router.get('/recyclepletter', function (req, res, next) {
    let token = req.header('token');
    checkToken(token, (result) => {
        if (result.status !== 0) {
            res.json(result);
        } else {
            let uid = result.data.uid;
            runSql(`select pletter.*,paper.ppimage from pletter,paper where isDelete=? and uid=? and pletter.ppid=paper.ppid`, [1,uid], (result1) => {
                console.log(result1);
                res.json(result1);
            });
        }
    });
});
/**
 * 彻底删除回收站信件
 * POST
 * 接收参数:
 *     pid：信件id
 * 返回参数：
 *      status: 0,
 *      message: 'OK',
 */
router.post('/recyclebin/deletebin', function (req, res, next) {
    let {pid} = req.body;
    let token = req.header('token');
    checkToken(token, (result) => {
        if (result.status !== 0) {
            res.json(result);
        } else {
            let uid = result.data.uid;
            runSql(`delete from pletter where isDelete=? and uid=? and pid=?`, [1,uid,pid], (result1) => {
                console.log(result1);
                res.json(result1);
            });
        }
    });
});
/**
 * 从回收站中恢复信件
 * POST
 * 接收参数:
 *     pid：信件id
 * 返回参数：
 *      status: 0,
 *      message: 'OK',
 */
router.post('/recyclebin/restore', function (req, res, next) {
    let {pid} = req.body;
    let token = req.header('token');
    // console.log(pid);
    checkToken(token, (result) => {
        if (result.status !== 0) {
            res.json(result);
        } else {
            let uid = result.data.uid;
            runSql(`update pletter set isDelete=? where isDelete=? and uid=? and pid=?`, [0,1,uid,pid], (result1) => {
                // console.log(result1);
                res.json(result1);
            });
        }
    });
});
/**
 * 获取收藏信件
 * GET
 * 接收参数:
 *     
 * 返回参数：
 *      status: 0,
 *      message: 'OK',
 */
router.get('/favorite', function (req, res, next) {
    let token = req.header('token');
    checkToken(token, (result) => {
        if (result.status !== 0) {
            res.json(result);
        } else {
            let uid = result.data.uid;
            runSql(`select * from pletter where isSend = ? and isCollection=? and touid=?`, [1,1,uid], (result1) => {
                // console.log(result1);
                res.json(result1);
            });
        }
    });
});
/**
 * 取消信件收藏
 * GET
 * 接收参数:
 *     pid:信件id
 * 返回参数：
 *      status: 0,
 *      message: 'OK',
 */
router.post('/delcollect', function (req, res, next) {
    let {pid} = req.body;
    let token = req.header('token');
    checkToken(token, (result) => {
        if (result.status !== 0) {
            res.json(result);
        } else {
            let uid = result.data.uid;
            runSql(`update pletter set isCollection=? where isSend=? and isCollection=? and touid=? and pid=?`,[0,1,1,uid,pid],(result1) => {
                // console.log(result1);
                res.json(result1);
            });
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
 * 获取通知
 * GET
 * 接收参数:
 *     
 * 返回参数：
 *      status: 0,
 *      message: 'OK',
 */
router.get('/notice', function (req, res, next) {
    let token = req.header('token');
    checkToken(token, (result) => {
        if (result.status !== 0) {
            res.json(result);
        } else {
            let uid = result.data.uid;
            runSql(`select * from notice`,[], (result1) => {
                // console.log(result1);
                res.json(result1);
            });
        }
    });
});

/**
 * 用户反馈
 * 请求方式：
 *      POST
 * 接收参数：
 *      feedback：用户输入的反馈信息
 * 返回参数：
 * 
 */
router.post('/feedback', function (req, res, next) {
    let {feedback}=req.body;
    let token = req.header('token');
    checkToken(token, (result) => {
        let uid = result.data.uid;
        if (result.status !== 0) {
            res.json(result);
        } else {
            runSql(`update user set feedback=? where uid=?`,[feedback,uid],(result1)=>{
                res.json(result1);
            })
        }
    });
});
/**
 * 改变个性签名
 * 请求方式：
 *      POST
 * 接收参数：
 *      signaure:个性签名
 * 返回参数:
 * 
 */
router.post('/changeSignature',function(req,res,next){
    let token=req.header('token');
    let {signature} = req.body;
    checkToken(token,(result)=>{
        if (result.status !== 0) {
            res.json(result);
        } else {
            let uid = result.data.uid;
            runSql('update user set signature=? where uid=?',[signature,uid],(result1)=>{
                res.json(result1)
            })
        }
    })
})
/**
 * 改变积分值
 * 请求方式：
 *      POST
 * 接受参数：
 * 返回参数：
 *      Grade：积分值
 */
router.post('/setgrade',function(req,res,next){
    let token = req.header('token');
    checkToken(token,(result)=>{
        if(result.status !== 0){
            res.json(result);
        }else{
            let uid = result.data.uid;
            let count;
            runSql(`select COUNT(pid) as num from pletter where uid=?`,[uid],(result1)=>{
                console.log(result1.data[0].num);
                count = result1.data[0].num;
                runSql(`select COUNT(isCollection) as num from pletter where uid=? and isCollection=?`,[uid,1],(result2)=>{
                    console.log(result2.data[0].num);
                    count += result2.data[0].num;
                    runSql(`select COUNT(isCollection) as num from pletter where uid=? and isCollection=?`,[uid,1],(result3)=>{
                        console.log(result3.data[0].num);
                        count += result3.data[0].num;
                        runSql('update user set grade=? where uid=?',[5*count,uid],(result4)=>{
                            console.log(result4);
                        })
                    })
                })
                
            })
        }
    })
})
/**
 * 获取积分值
 * 请求方式：
 *      GET
 * 接受参数：
 * 返回参数：
 *      grade：积分值
 */
router.get('/getgrade',function(req,res,next){
    let token = req.header('token');
    checkToken(token,(result)=>{
        if(result.status !== 0){
            res.json(result);
        }else{
            let uid = result.data.uid;
            runSql(`select grade from user where uid=?`,[uid],(result1)=>{
                res.json(result1);
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
 * 获取个人信息
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
 * 个人所写公开信
 * GET
 * 接收参数:
 */
router.get('/openlist', function (req, res, next) {
    let {uid} = req.query
    let token = req.header('token');
    checkToken(token, (result) => {
        if (result.status !== 0) {
            res.json(result);
        } else {
            runSql(`select user.Uname,user.Uimage,open.* from open,user where user.uid=open.uid and user.uid=? order by open.oid desc`,
            [uid],(result1) => {
                res.json(result1);
            });
        }
    });
});
/**
 * 查看分享列表
 * 请求方式：
 *      GET
 * 接收参数：
 * 返回参数：
 * 	 * 
 */
 router.get('/sendlist',function(req,res,next){
    let token = req.header('token');
    checkToken(token,(result)=>{
        if(result.status!==0){
            res.json(result);
        }else{
            let uid = result.data.uid;
            runSql(`select pletter.Pcontent,pletter.Pday,pletter.Pid,pletter.Ptitle,pletter.toNick,pletter.toUid,user.uimage,user.uname from pletter,user where  pletter.isSend = ? and pletter.uid=? and user.uid=pletter.uid`,[1,uid],(result1)=>{
                res.json(result1);
            })
        }
    })
})

module.exports = router;