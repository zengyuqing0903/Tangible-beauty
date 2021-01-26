var express = require('express');
var router = express.Router();

const runSql = require('../mysql');
const { getToken, checkToken } = require('../src/token');

const path = require('path');

const { getTimestamp_13 } = require('../src/timer');
const getRandom = require('../src/user/verification');
var multiparty = require('multiparty');
var fs = require('fs');

// let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTU3NDkzNDk1NCwiZXhwIjoxNTc3NjEzMzU0fQ.PQu7Dzp4MsurerTMR-wYSITeWKxGoo_aH_002CeEzqg';
/**
 * 获取一起写主题
 * 请求方式：
 *  GET
 * 接受参数：
 *      Uid:用户id
 */
router.get('/theme', function (req, res, next) {
    let token = req.header('token');
    checkToken(token, (result) => {
        // console.log(result);//这个可以获取到uid
        if (result.status !== 0) {
            res.json(result);
        } else {
            let uid = result.data.uid;
            var addUid = '%'+uid+'%';
            runSql(`select distinct theme.* from theme where theme.uid=? or inviteUid like ?`,[uid,addUid],(result1) => {
                res.json(result1);
            })
        }
    });
   
});


/**
 * 获取主题详情
 * 请求方式：
 *  GET
 * 接受参数：
 *      tid：主题id
 * 返回参数：
 *      tid:主题id
 *      tname：主题名称
 *      timage：主题图片
 *      tday：创建日期
 *      lid:信件id
 *      ltitle：信件标题
 *      lcontent:信件内容
 *      lday:信件创建日期
 */
router.get('/theme/showtheme',function(req,res,next){
    // http:localhost:8000/v1/together/theme/showtheme?tid=1
    let token = req.header('token');
    let {tid} = req.query;
    checkToken(token,(result)=>{
        if(result.status != 0){
            res.json(result);
        }else{
            let uid = result.data.uid;
            let addUid = '%'+ uid +'%';
            runSql(`select tletter.ltitle,tletter.lcontent,tletter.tid,tletter.lday,tletter.lid from tletter where  tletter.tid=? and (tletter.uid=? or inviteUid like ?)`,
                    [tid,uid,addUid],(result1) => {
                        console.log(result1);
                        res.json(result1);
                    })
        }
    })
})
/**
 * 展示主题详情头部
 * 请求方式：
 *      GET
 * 接受参数：
 *      tid：主题id
 * 返回参数：
//  *      
 */
router.get('/theme/showtitle',function(req,res,next){
    let{tid} = req.query;
    let token = req.header('token');
    // console.log(tid)
    checkToken(token,(result)=>{
        if(result.status !=0){
            res.json(result);
        }else{
            runSql(`select theme.*  from theme where theme.tid=?  `,[tid],(result1)=>{
                res.json(result1);
            })
        }
    })
})
/**
 * 获取成员
 * GET
 * 接受参数：
 *      tid:主题id
 * 返回参数：
 *      uname:用户名
 *      tid:主题id
 */
router.get("/theme/showtheme/member",function(req,res,next){
    // http://localhost:3000/v1/together/theme/showtheme/member?tid=2
    let{tid} = req.query;
    let token = req.header('token');
    checkToken(token,(result)=>{
        if(result.status != 0){
            res.json(result);
            }else{
                runSql(`select distinct user.uname,tmember.tid,user.uid from tmember,user where tmember.tid=? and (tmember.uid = user.uid) and tag=?`,[tid,1],(result1) =>{
                    res.json(result1);
                } )
        }
    })
})
/**
 * 新建一起写信件
 * POST
 * 接收参数:
 *     title:信件标题
 *     content:信件内容
 *     day:创建日期
 */
router.post('/theme/writeletter', function (req, res, next) {
    let { title, content,lday,tid} = req.body;
    let token = req.header('token');
    checkToken(token, (result) => {
        if(result.status != 0){
            res.json(result);
        }else{
            let uid = result.data.uid;
            console.log(tid)
            runSql(`select inviteUid from theme where tid=?`,[tid],(result2)=>{
                console.log(result2.data[0].inviteUid)
                let inviteUid=result2.data[0].inviteUid;
                runSql(`insert into tletter(Ltitle, Lcontent, Uid,Lday,Tid,isDelete,ppid,insertImg,inviteUid) values (?,?,?,?,?,?,?,?,?)`,
                [title, content,uid,lday,tid,0,41,null,inviteUid],(result1)=>{
                    res.json(result1);
                })
            })
        }
    })
});
 
/**
 * 删除一起写信件
 * 请求方式：
 *      POST
 * 接受参数：
 *      lid：信件id
 * 返回参数：
 * 
 */
router.post("/theme/delletter",function(req,res,next){
    let {lid} = req.body;
    let token = req.header('token');
    checkToken(token,(result)=>{
        if(result.status != 0){
            res.json(result);
        }else{
            runSql(`delete from tletter where lid=?`,[lid],(result1)=>{
                // runSql(`select * from tletter where lid=?`,[lid],(result2)=>{
                //     res.json(result2);
                // })
                res.json(result1);
            })

        }
    })
})

/**
 * 添加主题
 * 请求方式：
 *      POST
 * 接受参数：
 *      tname：主题名称
 *      timage：主题图片
 *      tday：创建日期
 *      isPrivate:是否公开
 * 返回参数：
 * 
 */
 router.post('/theme/addtheme',function(req,res,next){
     let {tname,timage,tday,isPrivate} = req.body;
     let token = req.header('token');
     checkToken(token,(result) => {
         if(result.status != 0){
             res.json(result);
         }else{
             let uid = result.data.uid;
             runSql(`insert into theme (tname,timage,isPrivate,uid,tday) value(?,?,?,?,?)`,[tname,timage,isPrivate,uid,tday],
             (result1) => {
                 res.json(result1);
             })
         }
     })
 })
 /**
  * 添加创建者成员
  * 请求方式：
  *      POST
  * 接收参数：
  *     tid:信件id
  * 返回参数：
  *     
  */
router.post('/theme/addFirstMember',function(req,res,next){
    let {tid} = req.body;
    let token = req.header('token');
    let own;
    checkToken(token,(result)=>{
        if(result.status!=0){
            res.json(result);
        }else{
            let uid =result.data.uid;
            runSql('select uid from theme where tid=?',[tid],(result1)=>{
                own = result1.data[0].uid;
                if(own == uid){
                    runSql(`select uid from tmember where tid=?`,[tid],(result2)=>{; 
                        if(result2.data.length==0){
                            runSql('insert into tmember(tid,uid,tag,own) value(?,?,?,?)',[tid,own,1,1],(result3)=>{
                                console.log(result3);
                            })
                        }
                    })
                }
            })
        }
    })
})
/**
 * 邀请成员
 * 请求方式：
 *      POST
 * 接受参数
 *      tid：主题id
 *      phone：手机号码
 * 返回参数：
 *      
 */
router.post('/addmember',function(req,res,next){
    let {tid,phone,inviteMessage} = req.body;
    let token = req.header('token');
    checkToken(token,(result)=>{
        if(result.status !== 0){
            res.json(result);
        }else{
            runSql(`select uid from user where uphone=?`,[phone],(result1)=>{
                //该用户存在
                if(result1.data.length > 0){
                    let addUid = result1.data[0].uid;
                    runSql(`select * from tmember where tid=? and uid=? `,[tid,addUid],(result2)=>{
                        //未邀请该成员
                        console.log(result2);
                        if(result2.data.length == 0){
                            //邀请该成员
                            runSql(`insert into tmember(tid,uid,inviteMessage,tag) value(?,?,?,?)`,[tid,addUid,inviteMessage,0],(result8)=>{
                            console.log("成功")
                            })
                        }else{
                            res.json({status:2});//已邀请过该成员
                        }
                    })
                }else{
                    res.json({status:1})//不存在此用户
                }
            })
        }
    })
})
/**
 * 成员确认加入
 * 请求方式：
 *      POST
 * 接受参数：
 *      tid：信件id
 *      tag:是否确认(1是确认)
 */
router.post('/confirmMessage',function(req,res,next){
    let {tid,tag} = req.body;
    let token = req.header('token');
    checkToken(token,(result)=>{
        if(result.status!==0){
            res.json(result)
        }else{
            let addUid = result.data.uid;
            runSql(`update tmember set tag=? where tid=? and uid=?`,[tag,tid,addUid],(result1)=>{
                    runSql(`select inviteUid from theme where tid=?`,[tid],(result3)=>{
                        //如果已有成员
                        if(result3.data[0].inviteUid){
                            let inviteUid = result3.data[0].inviteUid + ','+addUid;
                            console.log(inviteUid);
                            runSql(`update theme set inviteUid=? where tid=?`,[inviteUid,tid],(result4)=>{
                                console.log(inviteUid);
                                runSql(`update tletter set inviteUid=? where tid=?`,[inviteUid,tid],(result5)=>{
                                    res.json(result5)
                                })
                            })
                        }else{
                            console.log(addUid,'1')
                            runSql(`update theme set inviteUid=? where tid=?`,[addUid,tid],(result6)=>{
                                runSql(`update tletter set inviteUid=? where tid=?`,[addUid,tid],(result7)=>{
                                    res.json(result7)
                                })
                            })
                        }
                    })
                console.log("成功")
            })
        }
    })
})
/**
 * 获取主题创建者
 * 请求方式：
 *      GET
 * 接受参数：
 *      tid：主题id
 * 返回参数：
 *      uname：创建者名字
 */
/**
 * 获取邀请通知
 * 请求方式：
 *      GET
 * 接收参数：
 * 返回参数：
 */
router.get('/getmessage',function(req,res,next){
    let token = req.header('token');
    checkToken(token,(result)=>{
        if(result.status!==0){
            res.json(result)
        }else{
            let uid = result.data.uid;
            runSql(`select tmember.*,user.* from tmember,user,theme where tmember.uid=? and tag=? and (tmember.tid =theme.tid ) and (theme.uid=user.uid)`,[uid,0],(result1)=>{
                console.log(result1);
                res.json(result1);
            })
        }
    })
})
/**
 * 获取邀请通知
 * 请求方式：
 *      GET
 * 接收参数：
 * 返回参数：
 */
// router.get('/getmessage',function(req,res,next){
//     let token = req.header('token');
//     checkToken(token,(result)=>{
//         if(result.status!==0){
//             res.json(result)
//         }else{
//             let uid = result.data.uid;
//             runSql(`select tid from tmember where uid=? and tag=?`,[uid,0],(result1)=>{
//                 if(result1.data.length ==0){
//                     res.json(result1)
//                 }else{
//                     let tid = result1.data[0].tid;
//                     runSql(`select tmember.inviteMessage,tmember.tid,user.* from tmember,user where tid=? and own=? and(tmember.uid=user.uid)`,
//                     [tid,1],(result2)=>{
//                         res.json(result2);
//                     })
//                 }
                
                
//             })
//         }
//     })
// })
/**
 * 查找邀请信息
 * 请求方式：
 *      GET
 * 接收参数：
 *      uname：用户名
 * 返回参数：
 * 
 */
router.get("/searchUname",function(req,res,next){
    let {uname} = req.query;
    let token = req.header('token');
    checkToken(token,(result)=>{
        if(result.status!==0){
            res.json(result)
        }else{
            let uid = result.data.uid;
            let name = '%'+uname+'%';
            console.log(name);
            runSql(`select tmember.*,user.* from tmember,user,theme where uname like ? and tmember.uid=? and tag=? and (tmember.tid =theme.tid ) and (theme.uid=user.uid)`,[name,uid,0],(result1)=>{
                console.log(result1);
                res.json(result1);
            })
        }
    })
})
  /**
  * 删除成员
  * 请求方式：
  *      POST
  * 接受参数：
  *     uid:用户id
  *     tid:主题id
  * 返回参数：
  *     
  */
 router.post('/theme/deltmember',function(req,res,next){
    let {uid,tid} = req.body;
    let token = req.header('token');
    checkToken(token,(result)=>{
        if(result.status != 0){
            res.json(result.json);
        }else{
            console.log(uid)
            runSql(`select own from tmember where tid=? and uid=?`,[tid,uid],(result3)=>{
                let tag = result3.data[0].own
                console.log(result3.data[0].own,'tag');
                if(!tag){
                    runSql(`delete from tmember where uid=? and tid=?`,[uid,tid],(result1)=>{
                        runSql(`select inviteUid from theme where tid=?`,[tid],(result2)=>{
                            console.log(result2)
                            let data = result2.data[0].inviteUid;
                            console.log(data,'data');
                            if(data.length>1){
                                var arr = data.split(",")
                                for(var i=0;i<arr.length;i++){
                                    if(arr[i]==uid){
                                        arr.splice(i,1);
                                    }
                                }
                                var struid = arr.join(",")
                                runSql('update theme set inviteUid=? where tid=?',[struid,tid],(result3)=>{
                                    runSql('update tletter set inviteUid=? where tid=?',[struid,tid],(result4)=>{
                                        console.log(result4);
                                        console.log("删除成功1")
                                        res.json({status:0});
                                    })
                                })
                            }else{
                                runSql('update theme set inviteUid=? where tid=?',[null,tid],(result3)=>{
                                    runSql('update tletter set inviteUid=? where tid=?',[null,tid],(result4)=>{
                                        console.log("删除成功2")
                                        console.log(result4);
                                        res.json({status:0});
                                    })
                                })
                            }
                        })
                    })
                }else{
                    res.json({status:1})
                    console.log("创建者不可删除")
                }
            })
           
        }
    })
})
 /**
  * 删除主题
  * 请求方式：
  *     POST
  * 接收参数：
  *     tid：主题id
  * 返回参数：
  */
 router.post('/theme/deltheme',function(req,res,next){
    let {tid} = req.body;
    let token = req.header('token');
    checkToken(token,(result)=>{
        if(result.status !=0){
            res.json(result)
        }else{
            var length;
            let uid = result.data.uid
            runSql(`select * from theme where tid=? and uid=?`,[tid,uid],(result4)=>{
                console.log(result4,'resu4');
                length = result4.data.length;
                if(length>0){
                    runSql(`select * from tletter where tid=?`,[tid],(result5)=>{
                        let len = result5.data.length
                        if(len > 0){
                            runSql(`delete from tletter where tid=?`,[tid],(result2)=>{
                                runSql(`delete from tmember where tid=?`,[tid],(result3)=>{
                                    runSql(`delete from theme where tid=?`,[tid],(result1)=>{
                                        res.json({status:0});
                                })
                            })
                        })
                        }else{
                            runSql(`delete from tmember where tid=?`,[tid],(result3)=>{
                                runSql(`delete from theme where tid=?`,[tid],(result1)=>{
                                    res.json({status:0});
                                })
                            })
                        }
                    })
                }else{
                    res.json({status:1})
                }
                
            })
        }
    })
})
 /**
 * 一起写修改信件内容()
 * 请求方式：
 *      POST
 * 接受参数：
 *      lid：信件id
 *      title:信件标题
 *      content：信件内容
 *      lday：信件修改后的日期
 *      ppid：信件背景
 * 返回参数：
 *      
 */
router.post('/theme/edit',function(req,res,next){
    let {lid,title,content,lday,ppid} = req.body;
    let token = req.header('token');
    // console.log(title,content);
    checkToken(token,(result) => {
        if(result.status !=0){
            res.json(result);
        }else{
            let uid =  result.data.uid;
            let addUid = '%'+ uid +'%';
            runSql(`update tletter set ltitle=?,lcontent=?,lday=?,ppid=? where lid=? and (uid=? or uid like ?)`,
                [title,content,lday,ppid,lid,uid,addUid],(result2)=>{
                res.json(result2);
            })
        }        
        })    
})
/**
 * 展示信件内容(编辑和展示用)
 * GET
 * 接收参数:
 *      lid:信件id
 * 
 */
router.get('/theme/show', function (req, res, next) {
    let {lid} = req.query;
    let token = req.header('token');
    checkToken(token, (result) => {
        if (result.status !== 0) {
            res.json(result);
        } else {   
            runSql(`select * from tletter where lid=?`, [lid], (result) => {
                res.json(result);
            });
        }
    });
});
/**
 * 更换信纸
 * 请求方式：
 *      POST
 * 接收参数：
 *      lid：信件id
 *      ppid：更换后的信纸id
 */
router.post('/changebg',function(req,res,next){
    let token = req.header('token');
    let {lid,ppid} =  req.body;
    checkToken(token,(result)=>{
        if(result.status != 0){
            res.json(result)
        }else{
            runSql('update tletter set ppid=? where lid=? ',[ppid,lid],(result1)=>{
                res.json(result1);
            })
        }
    })
})
module.exports = router;