var express = require('express');
var router = express.Router();

const runSql = require('../mysql');
const { getToken, checkToken } = require('../src/token');

/**
 * 获取帮助用户信息
 * 请求方式：
 *      GET
 * 返回参数：
 *      uid：用户id
 *      uname：用户昵称
 *      uphone：用户手机号
 *      feedback：用户帮助信息
 *      backMessage：反馈信息
 */
router.get('/helpUser',function(req,res,next){
    runSql('select * from user where feedback is not null',[],(result)=>{
        res.json(result);
    })
})
/**
 * 查找feedback
 * 请求方式
 *      GET
 * 接受参数：
 *      uid：用户id
 * 返回参数：
 *      feedback：帮助信息
 */
router.get('/searchFeedback',function(req,res,next){
    let {uid} = req.query;
    console.log(uid);
    runSql('select feedback from user where uid=?',[uid],(result)=>{
        // console.log(result);
        res.json(result);
    })
})
/**
 * 保存反馈信息
 * 请求方式：
 *      POST
 * 接受参数：
 *      uid：用户id
 *      backMessage：反馈信息
 */
router.post('/saveBack',function(req,res,next){
    let {uid,backMessage} = req.body;
    console.log(uid,backMessage)
    runSql('update user set backMessage=? where uid=?',[backMessage,uid],(result)=>{
        res.json(result)
    })
})
module.exports = router;