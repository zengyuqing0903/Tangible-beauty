var express = require('express');
var router = express.Router();

const runSql = require('../mysql');
const { getToken, checkToken } = require('../src/token');

const path = require('path');

const { getTimestamp_13 } = require('../src/timer');
const getRandom = require('../src/user/verification');
var multiparty = require('multiparty');
/**
 * 打卡
 * 请求方式：
 *      POST
 * 接收参数：
 *      sday：日期
 *      month：月份
 */
router.post('/sign',function(req,res,next){
    let {sday,month} = req.body;
    let token = req.header('token');
    checkToken(token,(result)=>{
        if(result.status !== 0){
            res.json(result);
        }else{
            let uid = result.data.uid;
            runSql(`insert into signin(uid,sday,month) value(?,?,?)`,[uid,sday,month],(result1)=>{
                // console.log(result1);
                res.json(result1);
            })
        }
    })
})
/**
 * 查询当月打卡信息
 * 请求方式：
 *      GET
 * 接收参数：
 *      month：月份
 * 返回参数：
 *      sday：日期
 */
router.get('/getsign',function(req,res,next){
    let {month} = req.query;
    let token = req.header('token');
    checkToken(token,(result)=>{
        if(result.status !== 0){
            res.json(result);
        }else{
            let uid = result.data.uid;
            runSql(`select sday from signin where uid=? and month=?`,[uid,month],(result1)=>{
                console.log(result1);
                res.json(result1);
            })
        }
    })
})
module.exports = router;