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
router.get('/chuanda',function(req,res,next){
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
router.get('/lvxing',function(req,res,next){
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
router.get('/jianshen',function(req,res,next){
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
router.get('/keji',function(req,res,next){
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
router.get('/kexue',function(req,res,next){
    let token = req.header('token');
    let {kexue} = req.query;
    checkToken(token, (result) => {
        if (result.status !== 0) {
            res.json(result);
        } else {
            runSql(`select postcontent.*,user.uname,user.uimage from postcontent,user where ptype=? and (postcontent.uid=user.uid)`,[kexue],(result)=>{
                console.log(result.data);
                res.json(result);
            })
    }
    })
})
module.exports = router;
