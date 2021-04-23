var express = require('express');
var router = express.Router();

const runSql = require('../mysql');

const { getTimestamp_13 } = require('../src/timer');
const getRandom = require('../src/user/verification');
const sendEmail = require('../src/user/email');
const sendMsg = require('../src/user/message');
const { getToken, checkToken } = require('../src/token');

var v_minute = 3; // 验证码有效时间

/**
 * 获取验证码
 * POST
 * 接收参数:
 *     account : 手机号/邮箱
 *     type    : 类型  (phone/email)
 * 返回参数:
 *     status: 0,
 *     message: "OK"
 */
router.post('/verification', function (req, res, next) {    
    let { account, type } = req.body;
    
    var verification = getRandom(6);
    var minute = '' + v_minute;

    runSql(`select uid from user where u${type} = ?`, [account], (result) => {
        if (result.status === 0) {
            if (result.data.length === 0) {
                runSql('insert into verification(vaccount, vtype, vcode, vtime) values (?,?,?,?)', [account, type, verification, getTimestamp_13()], (result) => {
                    if (result.status === 0) {
                        if (type === 'phone') {
                            sendMsg(account, verification, minute, (result) => {
                                let jsonData = {
                                    status: result.status,
                                    message: result.message
                                }
                                res.json(jsonData);
                            });
                        } else if (type === 'email') {
                            sendEmail(account, verification, minute, (result) => {
                                let jsonData = {
                                    status: result.status,
                                    message: result.message
                                }
                                res.json(jsonData);
                            });
                        } else {
                            let jsonData = {
                                status: 10003,
                                message: 'type error'
                            }
                            res.json(jsonData);
                        }
                    } else if (result.status === 1062) {
                        runSql('update verification set vcode = ?, vtime = ? where vaccount = ?', [verification, getTimestamp_13(), account], (result) => {
                            if (result.status === 0) {
                                if (type === 'phone') {
                                    sendMsg(account, verification, minute, (result) => {
                                        let jsonData = {
                                            status: result.status,
                                            message: result.message
                                        }
                                        res.json(jsonData);
                                    });
                                } else if (type === 'email') {
                                    sendEmail(account, verification, minute, (result) => {
                                        let jsonData = {
                                            status: result.status,
                                            message: result.message
                                        }
                                        res.json(jsonData);
                                    });
                                } else {
                                    let jsonData = {
                                        status: 10003,
                                        message: 'type error'
                                    }
                                    res.json(jsonData);
                                }
                            } else {
                                res.json(result);
                            }
                        });
                    } else {
                        res.json(result);
                    }
                });
            } else {
                let jsonData = {
                    status: 10005,
                    message: 'user exist',
                }
                res.json(jsonData);
            }
        } else {
            res.json(result);
        }
    })
});

/**
 * 用户注册
 * POST
 * 接收参数:
 *     account      : 手机号/邮箱
 *     type         : 类型  (phone/email)
 *     verification : 验证码
 *     password     : 密码
 *     name         : 昵称 (可选)
 *     uday         : 注册时间
 * 
 * 返回参数:
 *     status: 0,
 *     message: "OK"
 */
router.post('/register', function (req, res, next) {    
    let { account, type, verification, password, name } = req.body;
    let date = new Date();
    let a = '' + date.getFullYear()+'-'+ (date.getMonth() < 9 ? '0' + (date.getMonth()+1)+'-' : (date.getMonth()+1))+'-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
    console.log(a);
    runSql('select vcode,vtime from verification where vaccount = ?', [account], (result) => {
        if (result.status === 0) {
            if (result.data.length === 0) {
                let jsonData = {
                    status: 10006,
                    message: 'get verification error'
                }
                res.json(jsonData);
            } else if (result.data.length === 1) {
                let minuteTimestamp = v_minute * 60000 + 20000;
                if ((getTimestamp_13() - result.data[0].vtime) < minuteTimestamp) {
                    if (result.data[0].vcode === verification) {
                        if (type === 'phone' || type === 'email') {
                            runSql(`insert into user(u${type}, upassword, uname,uimage,uday,signature,homeBack) values (?,?,?,?,?,'这家伙很懒什么也没有','1234567899876_11.jpg')`, [account, password, name,'1234567890987_11.jpg',a], (result) => {
                                runSql('delete from verification where vaccount = ?', [account], (result) => {
                                    // console.log(result);
                                });
                                res.json(result);
                            });
                        } else {
                            jsonData = {
                                status: 10003,
                                message: 'type error'
                            }
                            res.json(jsonData);
                        }
                    } else {
                        let jsonData = {
                            status: 10009,
                            message: 'verification error',
                        }
                        res.json(jsonData);
                    }
                } else {
                    let jsonData = {
                        status: 10008,
                        message: 'verification timeout',
                    }
                    res.json(jsonData);
                }
            } else {
                let jsonData = {
                    status: 10007,
                    message: 'get verification error',
                    data: result.data
                }
                res.json(jsonData);
            }
        } else {
            res.json(result);
        }
    });
});

/**
 * 用户登录
 * POST
 * 接收参数:
 *     account      : 手机号/邮箱
 *     type         : 类型  (phone/email)
 *     password     : 密码
 * 
 * 返回参数:
 *     status: 0,
 *     message: "OK"
 */
router.post('/login', function (req, res, next) {
    let { account, type, password } = req.body;
    console.log(account,type,password)
    if (type === 'phone' || type === 'email') {
        runSql(`select uid,upassword from user where u${type} = ?`, [account], (result) => {
            console.log(result);
            if (result.status === 0) {
                if (result.data.length === 0) {
                    let jsonData = {
                        status: 10004,
                        message: 'no user'
                    }
                    res.json(jsonData);
                } else {
                    if (result.data[0].upassword === password) {
                        let tokenContent = {
                            uid: result.data[0].uid
                        };
                        let params = {
                            expiresIn: 60 * 60 * 24 * 31  // 31天过期
                        }

                        let token = getToken(tokenContent, params);

                        let jsonData = {
                            status: 0,
                            message: 'OK',
                            data: {
                                token: token
                            }
                        }
                        res.json(jsonData);
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
    } else {
        jsonData = {
            status: 10003,
            message: 'type error'
        }
        res.json(jsonData);
    }
});

/**
 * 用户短信登录
 * POST
 * 接收参数:
 *     uphone     : 手机号/邮箱
 * 返回参数:
 *     status: 0,
 *     message: "OK"
 */
router.post('/smslogin', function (req, res, next) {
    let { uphone} = req.body;
        runSql(`select * from user where uphone = ?`, [uphone], (result) => {
            if (result.status === 0) {
                if (result.data.length === 0) {
                    let jsonData = {
                        status: 10004,
                        message: 'no user'
                    }
                    res.json(jsonData);
                } else {
                    res.json(result);
                    }
            } else {
                // console.log(result)
                res.json(result);
            }
        });
});

/**
 * 短信登录获取验证码
 * POST
 * 接收参数:
 *     account : 手机号/邮箱
 *     type    : 类型  (phone/email)
 * 返回参数:
 *     status: 0,
 *     message: "OK"
 */
router.post('/smsverification', function (req, res, next) {    
    let {uphone} = req.body;
    
    var verification = getRandom(6);
    var minute = '' + v_minute;

    runSql(`select uid from user where uphone = ?`, [uphone], (result) => {
        if (result.status === 0) {
            runSql('insert into verification(vaccount, vtype, vcode, vtime) values (?,?,?,?)', [uphone, 'phone', verification, getTimestamp_13()], (result) => {
                if (result.status === 0) {
                    sendMsg(uphone, verification, minute, (result) => {
                        let jsonData = {
                            status: result.status,
                            message: result.message
                        }
                        res.json(jsonData);
                    });    
                } else if (result.status === 1062) {
                    runSql('update verification set vcode = ?, vtime = ? where vaccount = ?', [verification, getTimestamp_13(), uphone], (result) => {
                        if (result.status === 0) {
                            sendMsg(uphone, verification, minute, (result) => {
                                let jsonData = {
                                    status: result.status,
                                    message: result.message
                                }
                                res.json(jsonData);
                            });
                        } else {
                            res.json(result);
                        }
                    });
                } else {
                    res.json(result);
                }
                runSql('delete from verification where vaccount = ?', [uphone], (result) => {
                    // console.log(result);
                });
            });
        } 
        else {
            res.json(result);
        }
    })
});

module.exports = router;
