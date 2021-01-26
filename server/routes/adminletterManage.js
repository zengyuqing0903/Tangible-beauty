var express = require('express');
var router = express.Router();

const runSql = require('../mysql');
const { getToken, checkToken } = require('../src/token');

/**
 * 获取私密写信件列表
 * GET
 * 返回参数：
 *  {
 *     status: 0, 
 *     message: 'OK', 
 *     data:[
 *         {
 *          Pid: 23,
            Ptitle: '快来给他写信吧',
            Pcontent: '他的信箱还没有东西哦',
            Uid: 1,
            toUid: null,
            toNick: '哈哈哈',
            isSend: 0,
            Pday: 1576045963000,
            isCollection: 0,
            isDelete: 0
 *          }
 *      ]
 *  },
 * 
 */
router.get('/', function (req, res, next) {
    runSql(`select * from pletter`, [], (result1) => {
        console.log(result1);
        res.json(result1);
    }); 
});

/**
 * 私密写信件列表删除操作
 * POST
 * 返回参数：
 *  {
 *     status: 0, 
 *     message: 'OK',   
 *  } 
 * 
 */
router.post('/delpletter', function (req, res, next) {
    let {pid} = req.body;
    runSql(`delete from pletter where pid=?`, [pid], (result1) => {
        console.log(result1);
        res.json(result1);
    }); 
});
/**
 * 获取私密写信件总数
 * GET
 * 返回参数：
 *  {
 *     status: 0, 
 *     message: 'OK', 
 *     data:[
 *         {
 *          totalpid: 10,
 *          }
 *      ]
 *  }
 */
router.get('/totalpid', function (req, res, next) {
    runSql(`select count(*) as totalpid from pletter`, [], (result1) => {
        console.log(result1);
        res.json(result1);
    }); 
});
/**
 * 获取一起写信件列表
 * GET
 * 返回参数：
 *  {
 *     status: 0, 
 *     message: 'OK', 
 *     data:[
 *         {
 *          Lid: 2,
            Ltitle: '邀请朋友吧',
            Lcontent: '欢迎来到一起写',
            Uid: 1,
            Lday: 1576045963000,
            isDelete: 0
 *          }
 *      ]
 *  },
 * 
 */
router.get('/tletterlist', function (req, res, next) {
    runSql(`select * from tletter`, [], (result1) => {
        console.log(result1);
        res.json(result1);
    }); 
});

/**
 * 一起写信件列表删除操作
 * POST
 * 返回参数：
 *  {
 *     status: 0, 
 *     message: 'OK',   
 *  } 
 * 
 */
router.post('/deltletter', function (req, res, next) {
    let {lid} = req.body;
    runSql(`delete from tletter where lid=?`, [lid], (result1) => {
        console.log(result1);
        res.json(result1);
    }); 
});
/**
 * 获取一起写信件总数
 * GET
 * 返回参数：
 *  {
 *     status: 0, 
 *     message: 'OK', 
 *     data:[
 *         {
 *          totallid: 2,
 *          }
 *      ]
 *  }
 */
router.get('/totallid', function (req, res, next) {
    runSql(`select count(*) as totallid from tletter`, [], (result1) => {
        console.log(result1);
        res.json(result1);
    }); 
});



module.exports = router;