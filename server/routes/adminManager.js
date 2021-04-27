var express = require('express');
var router = express.Router();

const runSql = require('../mysql');
const { getToken, checkToken } = require('../src/token');

/**
 * 展示管理者信息
 * 请求方式：
 *      GET
 * 接受参数：
 *      page:页数
 * 返回参数：
 *      
 */
router.get('/show',function(req,res,next){
    let token = req.header('token');
    checkToken(token,(result)=>{
        if(result.status !=0){
            res.json(result)
        }else{
            runSql(`select * from admin`,[],(result1)=>{
                // console.log(result);
                res.json(result1);
            })
        }
    })
    
})
/**
 * 删除管理员
 * 请求方式：
 *      POST
 * 接收参数：
 *      aid：管理员id
 * 返回参数:
 * 
 */
router.post('/deladmin',function(req,res,next){
    let {aid} = req.body;
    let token = req.header('token');
    checkToken(token,(result)=>{
        if(result.status !=0){
            res.json(result)
        }else{
            if(result.data.aid == aid){
                res.json('0');
            }else{
                runSql(`delete from admin where aid =?`,[aid],(result1)=>{
                    res.json(result1);
                })
            }
            
        }
    })
})
/**
 * 检查添加手机号码
 * 请求方式：
 *      GET
 * 接收参数：
 *      aphone：手机号码
 */
router.get('/checkphone',function(req,res,next){
    let {aphone} = req.query;
    runSql(`select aphone from admin where aphone=?`,[aphone],(result)=>{
        res.json(result);
    })
})
/**
 * 添加管理员
 * 请求方式：
 *      POST
 * 接收参数：
 *      aphone：手机号
 *      apassword：密码
 *      aname：用户名
 *      aday：创建时间
 */
router.post('/addadmin',function(req,res,next){
    let{aphone,apassword,aname,aday} = req.body;
    console.log(req.body);
    runSql(`insert into admin(aphone,apassword,aname,aday) values(?,?,?,?)`,[aphone,apassword,aname,aday],(result)=>{
        console.log(result)
        res.json(result);
    })
})
module.exports = router;