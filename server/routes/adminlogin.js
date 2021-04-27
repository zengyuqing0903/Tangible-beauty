var express = require('express');
var router = express.Router();

const runSql = require('../mysql');
const { getToken, checkToken } = require('../src/token');
/**
 * 登录：
 * 请求方式：
 *      POST
 * 接收参数：
 *      account：手机号
 *      password：密码
 * 返回参数：
 *  
 */

router.post('/login', function (req, res, next) {
    let { account, password } = req.body;
        runSql(`select aid,apassword from admin where aphone = ?`, [account], (result) => {
            if (result.status === 0) {
                if (result.data.length === 0) {
                    let jsonData = {
                        status: 10004,
                        message: 'no user'
                    }
                    res.json(jsonData);
                } else {
                    if (result.data[0].apassword === password) {
                        let tokenContent = {
                            aid: result.data[0].aid
                        };
                        let params = {
                            expiresIn: 60 * 60 * 24 * 31  // 31天过期
                        }

                        let token = getToken(tokenContent, params);
                        runSql(`select  * from notice`,[],(result1)=>{
                            // let data = result1.data;
                            let jsonData = {
                                status: 0,
                                message: 'OK',
                                data: {
                                    token: token,
                                    // aid:tokenContent.aid
                                }
                            }
                            res.json(jsonData);
                        })  
                    } else {
                        let jsonData = {
                            status: 10010,
                            message: 'password error'
                        }
                        res.json(jsonData);
                    }
                }
            } else {
                res.json(result);
            }
        });
    
});

/**
 * 获取登录的用户名
 * 请求方式：
 *      GET
 * 接收参数：
 * 返回参数：
 *      aname：管理者名
 */
router.get('/getname',function(req,res,next){
    // console.log(req);
    let token = req.header('token');
    // console.log(token);
    checkToken(token,(result)=>{
        let aid = result.data.aid;
        console.log(aid);
        runSql(`select aname from admin where aid=?`,[aid],(result1)=>{
            res.json(result1);
        })
    })
})
module.exports = router;
