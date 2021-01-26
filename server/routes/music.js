var express = require('express');
var router = express.Router();
var multer = require("multer");
const path = require('path');

const runSql = require('../mysql');
const { getTimestamp_13 } = require('../src/timer');
const { getToken, checkToken } = require('../src/token');
const getRandom = require('../src/user/verification');
var multiparty = require('multiparty');
var fs = require('fs');
/**
 * 插入音频（私密写）
 * 请求方式：
 *      POST
 * 接受参数：
 *      pid:信件id
 */
router.post('/insertMp3', function(req, res){
    let token = req.header('token');
    let {pid} = req.body;
    checkToken(token, (result) => {
        if (result.status !== 0) {
            res.json(result);
        } else {   
            var form = new multiparty.Form();
            form.parse(req, function(err, fields, files){
                //将前台传来的base64数据去掉前缀
                var musicData = req.body.mp3Data.replace(/^data:audio\/\w+;base64,/,"");;
                var dataBuffer = new Buffer.from(musicData, 'base64');
                //写入文件
                var name = getTimestamp_13()+'_'+getRandom(2)+'.mp3';
                var musicPath = path.join(__dirname,'../public/music/'+name);
                fs.writeFile(musicPath, dataBuffer, function(err){
                    if(err){
                        res.send(err);
                    }else{
                        runSql('select music from pletter where pid=?',[pid],(result1)=>{
                            var mp3 = result1.data[0].music;
                            if(mp3==null){
                                runSql('update pletter set music=? where pid=? ',[name,pid],(result2)=>{
                                })
                            }else{
                                runSql('update pletter set music=? where pid=? ',[name,pid],(result3)=>{
                                    fs.unlinkSync(path.join(__dirname,'../public/music/'+mp3));
                                })
                            }
                            res.json({status: 0, data: [name]});
                        })
                    }
                });
            });
        }
    })
});
/**
 * 展示插入音频（私密写）
 * 请求方式：
 *      GET
 * 接受参数：
 *      pid：信件id
 * 返回参数：
 *      
 */
router.get('/showmusic',function(req,res){
    let token = req.header('token');
    let {pid} = req.query;
    checkToken(token,(result)=>{
        if(result.status !== 0) {
            res.json(result);
        }else{ 
            runSql('select music from pletter where pid=?',[pid],(result1)=>{
                var music = result1.data[0].music;
                if(music == null){
                    res.json(result1)
                }else{
                    res.json({status: 0, data: [music]});
                }
            })
        }
    })
})

/**
 * 删除插入音频(私密写)
 * 请求方式
 *      POST
 * 接受参数：
 *      pid：信件id
 *      music：音乐名
 */
router.post('/delMp3',function(req,res,next){
    let token = req.header('token');
    let {pid,music} = req.body;
    checkToken(token,(result)=>{
        if(result.status !==0){
            res.json(result)
        }else{
            runSql('update pletter set music=? where pid=?',[null,pid],(result2)=>{
                fs.unlinkSync(path.join(__dirname,'../public/music/'+music));
                res.json(result2);
            })
        }
    })
})

/**
 * 插入音频（一起写）
 * 请求方式：
 *      POST
 * 接受参数：
 *      lid:信件id
 *      mp3Data:音乐的base64编码
 */
router.post('/insertMusic', function(req, res){
    let token = req.header('token');
    let {lid,mp3Data} = req.body;
    checkToken(token, (result) => {
        if (result.status !== 0) {
            res.json(result);
        } else {   
            var form = new multiparty.Form();
            form.parse(req, function(err, fields, files){
                //将前台传来的base64数据去掉前缀
                var musicData = mp3Data.replace(/^data:audio\/\w+;base64,/,"");;
                var dataBuffer = new Buffer.from(musicData, 'base64');
                //写入文件
                var name = getTimestamp_13()+'_'+getRandom(2)+'.mp3';
                var musicPath = path.join(__dirname,'../public/music/'+name);
                fs.writeFile(musicPath, dataBuffer, function(err){
                    if(err){
                        res.send(err);
                    }else{
                        runSql('select music from tletter where Lid=?',[lid],(result1)=>{
                            var mp3 = result1.data[0].music;
                            if(mp3==null){
                                runSql('update tletter set music=? where Lid=? ',[name,lid],(result2)=>{
                                })
                            }else{
                                runSql('update tletter set music=? where Lid=? ',[name,lid],(result3)=>{
                                    fs.unlinkSync(path.join(__dirname,'../public/music/'+mp3));
                                })
                            }
                            res.json({status: 0, data: [name]});
                        })
                    }
                });
            });
        }
    })
});
/**
 * 展示插入音频(一起写)
 * 请求方式：
 *      GET
 * 接受参数：
 *      lid：信件id
 * 返回参数：
 *      
 */
router.get('/presentMusic',function(req,res){
    let token = req.header('token');
    let {lid} = req.query;
    checkToken(token,(result)=>{
        if(result.status !== 0) {
            res.json(result);
        }else{ 
            runSql('select music from tletter where Lid=?',[lid],(result1)=>{
                var music = result1.data[0].music;
                if(music == null){
                    res.json(result1)
                }else{
                    res.json({status: 0, data: [music]});
                }
            })
        }
    })
})

/**
 * 删除插入音频(一起写)
 * 请求方式
 *      POST
 * 接受参数：
 *      lid：信件id
 *      music：音乐名
 */
router.post('/delmusic',function(req,res,next){
    let token = req.header('token');
    let {lid,music} = req.body;
    checkToken(token,(result)=>{
        if(result.status !==0){
            res.json(result)
        }else{
            runSql('update tletter set music=? where lid=?',[null,lid],(result2)=>{
                fs.unlinkSync(path.join(__dirname,'../public/music/'+music));
                res.json(result2);
            })
        }
    })
})
module.exports = router;