var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');

const runSql = require('../mysql');
/**
 * 获取公开写信息
 * 请求方式：
 *      GET
 * 接收参数：
 * 返回参数：
 * 
 */
router.get('/getopen',function(req,res,next){
    runSql(`select open.*,user.uname from open,user where (user.uid = open.uid)`,[],(result)=>{
        console.log(result);
        res.json(result);
    })
})
/**
 * 删除公开写信件
 * 请求方式：
 *         POST
 * 接收参数：
 *        oid：公开信id
 * 返回参数：
 */
router.post('/delopen',function(req,res,next){
    let {oid} = req.body;
    runSql(`delete from open where oid=? `,[oid],(result)=>{
        console.log(oid)
        res.json(result);
    })
})
/**
 * 获取公开写信件总数
 * 请求方式：
 *        GET
 * 接收参数：
 * 返回参数：
 *      num:3
 */
router.get('/opennum',function(req,res,next){
    runSql(`select COUNT(oid) as num from open`,[],(result)=>{
        res.json(result);
    })
})
module.exports = router; 