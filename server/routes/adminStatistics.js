var express = require('express');
var router = express.Router();

const runSql = require('../mysql');
const { getToken, checkToken } = require('../src/token');

/**
 * 获取昨日新注册用户数量
 * GET
 * 返回参数：
 *  {
 *     status: 0, 
 *     message: 'OK', 
 *     data: [ { usernum: 3 } ]     
 *  } 
 * 
 */
router.get('/', function (req, res, next) {
    let timestamp1 = new Date(new Date(new Date().toLocaleDateString()).getTime())-24 * 60 * 60 * 1000;
    let timestamp = new Date(new Date(new Date().toLocaleDateString()).getTime())-1;
    let time1 = new Date(timestamp1)    //先将时间戳转为Date对象，然后才能使用Date的方法
    let ntime = time1.getFullYear()+'-'+(time1.getMonth() + 1)+'-'+time1.getDate();
    let time = new Date(timestamp)    //先将时间戳转为Date对象，然后才能使用Date的方法
    let otime = time.getFullYear()+'-'+(time.getMonth() + 1)+'-'+time.getDate();
    runSql(`select count(uday) as usernum from user where uday between ? and ?`, [ntime,otime], (result1) => {
        console.log(result1);
        res.json(result1);
    }); 
});
/**
 * 获取累计注册
 * GET
 * 返回参数：
 *  {
 *     status: 0, 
 *     message: 'OK', 
 *     data: [ { totalnum: 4 } ]     
 *  } 
 * 
 */
router.get('/totalnum', function (req, res, next) {
    runSql(`select count(*) as totalnum from user`, [], (result1) => {
        console.log(result1);
        res.json(result1);
    });
});
/**
 * 用户分析获取历史数据查询
 * GET
 * 返回参数：
 *  {
 *     status: 0, 
 *     message: 'OK', 
 *     data: [ 
 *         {
 *            Uday:'2019-12-13',
 *            newregist:1 
 *         } 
 *     ]     
 *  } 
 * 
 */
router.get('/userdata', function (req, res, next) {
    runSql(`select Uday,count(Uday) as newregist from user group by uday`, [], (result1) => {   
        console.log(result1)
        res.json(result1);
    });
});

/**
 * 获取昨日新增加的写信数(私密写+一起写)
 * GET
 * 返回参数：
 *  {
 *     status: 0, 
 *     message: 'OK', 
 *     data: [ { newpletnum: 1 } ]     
 *  } 
 * 
 */
router.get('/addpletternum', function (req, res, next) {
    let timestamp1 = new Date(new Date(new Date().toLocaleDateString()).getTime())-24 * 60 * 60 * 1000;
    let timestamp = new Date(new Date(new Date().toLocaleDateString()).getTime())-1;
    runSql(`select count(pid) as newpletnum from pletter where pday between ? and ?`, [timestamp1,timestamp], (result1) => {
        var num = result1.data[0];
        runSql(`select count(lid) as newtletnum from tletter where lday between ? and ?`, [timestamp1,timestamp], (result2) => {
            result2.data.push(num);
            res.json(result2);
            console.log(result2);

        });
    });
});
/**
 * 获取昨日新增加分享数
 * GET
 * 返回参数：
 *  {
 *     status: 0, 
 *     message: 'OK', 
 *     data: [ { sharenum: 1 } ]     
 *  } 
 * 
 */
router.get('/shareletternum', function (req, res, next) {
    let timestamp1 = new Date(new Date(new Date().toLocaleDateString()).getTime())-24 * 60 * 60 * 1000;
    let timestamp = new Date(new Date(new Date().toLocaleDateString()).getTime())-1;
    runSql(`select count(isSend) as sharenum from pletter where isSend=? and (pday between ? and ?)`, [1,timestamp1,timestamp], (result1) => {
        console.log(result1);
        res.json(result1);
    });
});

/**
 * 获取累计写信数
 * GET
 * 返回参数：
 *  {
 *     status: 0, 
 *     message: 'OK', 
 *     data: [ { totalletnum: 3 } ]     
 *  } 
 * 
 */
router.get('/totalletnum', function (req, res, next) {
    runSql(`select count(pid) as totalpletnum from pletter`, [], (result1) => {
        var num1 = result1.data[0];
        runSql(`select count(lid) as totaltletnum from tletter`, [], (result2) => {
            console.log(result2);
            result2.data.push(num1);
            res.json(result2);
            console.log(result2);
        });
    });
});
/**
 * 信件分析获取历史数据查询
 * GET
 * 返回参数：
{
	"status":0,
	"data":{
		"p":[
			{"date":"2019-12-12","pidnum":1},
			{"date":"2019-12-13","pidnum":1}],
		"t":[]
	}
}
 * 
 */
router.get('/letterdata', function (req, res, next) {
    runSql(`select DATE_FORMAT(FROM_UNIXTIME(ROUND(pday/1000)),'%Y-%m-%d') as date,count(pid) as pidnum from pletter group by date`, [], (result1) => {   
        runSql(`select DATE_FORMAT(FROM_UNIXTIME(ROUND(lday/1000)),'%Y-%m-%d') as date1,count(lid) as lidnum from tletter group by date1`, [], (result2) => {
            let diet = {
                status: 0,
                data: {
                    p: result1.data,
                    t: result2.data
                }
            }
            res.json(diet);
        });
    });
});
module.exports = router;