var express = require('express');
var router = express.Router();

const runSql = require('../mysql');
const { getToken, checkToken } = require('../src/token');

/**
 * 获取用户总数：
 * 请求方式：
 *      GET
 * 接收参数：
 * 返回参数：
 * 
 */
router.get('/getusers',function(req,res,next){
    runSql(`select count(*) as num from user`,[],(result)=>{
        console.log(result)
        res.json(result);
        
    })
})
/**
 * 获取用户列表
 * 请求方式：
 *      GET
 * 接收参数：
 * 返回参数：
 *      uimage：用户头像
 *      uid：用户id
 *      uname：用户名
 *      uphone：用户手机号
 *      uday：注册时间
 *      
 */
router.get('/userlist',function(req,res,next){
        runSql(`select user.* from user `,[],(result1)=>{
            res.json(result1)
        })
})
/**
 * 检查uid是否是主题创建者
 * 请求方式：
 *      GET
 * 接收参数：
 *      uid:用户id
 * 返回参数：
 */
router.get('/checkuid',function(req,res,next){
    let {uid} = req.query;
    runSql(`select tid from theme where uid=?`,[uid],(result)=>{
        console.log(result);
        res.json(result);
    })
})
/**
 * 删除用户
 * 请求方式：
 *      POST
 * 接收参数：
 *      uid：用户id
 *      tid:用户id
 * 返回参数：
 * 
 */
router.post('/deluser',function(req,res,next){
    let {uid,tid} = req.body;
        runSql(`delete from pletter where uid=?`,[uid],(result1)=>{
            runSql(`delete from tletter where uid=?`,[uid],(result2)=>{
                runSql(`delete from tmember where tid=?`,[tid],(result4)=>{
                runSql(`delete from theme where uid=?`,[uid],(result3)=>{
                    runSql(`delete from user where uid=?`,[uid],(result)=>{
                        res.json(result3);
                    })
                    
                })
                
            })
        })
            
        })
})

module.exports = router;
