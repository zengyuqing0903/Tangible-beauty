var express = require('express');
var router = express.Router();

const runSql = require('../mysql');

const sendMsg = require('../src/user/message');
const { getToken, checkToken } = require('../src/token');

/**
 * 获取查看内容
 * 请求方式：
 *      GET
 * 接收参数：
 *      pid：视频id
 * 返回参数：
 * 
 */
router.get('/',function(req,res,next){
    let {pid} = req.query;
    let token = req.header('token');
    checkToken(token, (result) => {
        if (result.status !== 0) {
            res.json(result);
        } else {
                runSql(`select postcontent.*,user.uname,user.uimage from postcontent,user where pid=? and (postcontent.uid=user.uid)`,[1],(result)=>{
                    res.json(result);
                    // console.log(result);
                })
        }
    })
})
/**
 * 判断自己是否点赞
 */

/**
 * 查看评论
 */
/**
 * 点赞
 */
/**
 * 评论
 */
module.exports = router;