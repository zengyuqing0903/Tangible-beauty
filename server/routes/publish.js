var express = require('express');
var router = express.Router();

const runSql = require('../mysql');

const sendMsg = require('../src/user/message');
const { getToken, checkToken } = require('../src/token');
const { request } = require('../app');
var multiparty = require('multiparty');
var fs = require('fs');
/**
 * 插入音频
 * 请求方式：
 *      POST
 * 接受参数：
 *      pid:作品id
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
                        runSql('select music from postcontent where pid=?',[pid],(result1)=>{
                            var mp3 = result1.data[0].music;
                            if(mp3==null){
                                runSql('update postcontent set music=? where pid=? ',[name,pid],(result2)=>{
                                })
                            }else{
                                runSql('update postcontent set music=? where pid=? ',[name,pid],(result3)=>{
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
 * 展示插入音频
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
            runSql('select music from postcontent where pid=?',[pid],(result1)=>{
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
 * 删除插入音频
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
            runSql('update postcontent set music=? where pid=?',[null,pid],(result2)=>{
                fs.unlinkSync(path.join(__dirname,'../public/music/'+music));
                res.json(result2);
            })
        }
    })
})
/**
 * 上传图片
 */
 router.post('/image', function(req, res){
    let token = req.header('token');
    checkToken(token, (result) => {
        if (result.status !== 0) {
            res.json(result);
        } else {   
            var form = new multiparty.Form();
            form.parse(req, function(err, fields, files){
                //将前台传来的base64数据去掉前缀
                var imgData = req.body.imgData.replace(/^data:image\/\w+;base64,/, '');
                var dataBuffer = new Buffer.from(imgData, 'base64');
                //写入文件
                var name = getTimestamp_13()+'_'+getRandom(2)+'.png';
                var picPath = path.join(__dirname,'../public/image/'+name);
                fs.writeFile(picPath, dataBuffer, function(err){
                    if(err){
                        res.send(err);
                    }else{
                        res.send(name);
                    }
                });
            });
        }
    })

});
/**
 * 展示图片
 * 请求方式：
 *      GET
 * 接受参数：
 *      pid：信件id
 * 返回参数：
 *      
 */
 router.get('/showimage',function(req,res){
    let token = req.header('token');
    let {pid} = req.query;
    checkToken(token,(result)=>{
        if(result.status !== 0) {
            res.json(result);
        }else{ 
            runSql('select pimage from postcontent where pid=?',[pid],(result1)=>{
                 res.json(result1);
            })
        }
    })
})
/**
 * 上传作品
 * 请求方式：
 *      POST
 * 接受参数：
 *      
 */
/**
 * 上传视频
 */
module.exports = router;