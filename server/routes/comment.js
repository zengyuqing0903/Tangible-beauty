var express = require('express');
var router = express.Router();

const runSql = require('../mysql');

const sendMsg = require('../src/user/message');
const { getToken, checkToken } = require('../src/token');
const { request } = require('../app');
/**
 * 获取评论数
 * 请求方式：
 *      GET
 * 接收参数：
 *      pid：作品id
 * 返回参数：
 *      num：5
 */
router.get('/commentnum',function(req,res,next){
    let {pid} = req.query;
    checkToken(token, (result) => {
        if (result.status !== 0) {
            res.json(result);
        } else {
            runSql(`select count(pid) as num from comment where pid=?`,[pid],(result)=>{
                console.log(result);
                res.json(result);
            })
        }
    })
})
/**
 * 获取评论
 * 请求方式：
 *      GET
 * 接受参数：
 *      pid：作品id
 * 返回参数：
 * 
 */
router.get('/getcomment',function(req,res,next){
    let {pid} = req.query;
    // checkToken(token, (result) => {
    //     if (result.status !== 0) {
    //         res.json(result);
    //     } else {
            runSql(`select user.uname,user.uimage,comment.*  from user,comment where pid=? and (comment.uid=user.uid)`,[pid],(result)=>{
                console.log(result);
                res.json(result);
            })
    //     }
    // })
})
/**
 * 发布评论
 * 请求方式：
 *      POST
 * 接受参数：
 *      pid：作品id
 *      touid：发布者id
 *      comment：评论内容
 * 返回参数：
 * 
 */
router.post('/postcomment',function(req,res,next){
    let {pid,touid,comment,comday} = req.body;
    checkToken(token, (result) => {
        if (result.status !== 0) {
            res.json(result);
        } else {
            let uid = result.data[0].uid;
            console.log(pid,touid,comment,comday);
            runSql(`insert into comment(pid,uid,touid,comment,comday) values(?,?,?,?,?)`,[pid,uid,touid,comment,comday],(result)=>{
                res.json(result);
            })
        }
    })
})
/**
 * 回复评论
 */
/**
 * 评论点赞
 */
/**
 * 删除评论
 * 请求方式：
 *      POST
 * 接收参数：
 *      
 */
module.exports = router;