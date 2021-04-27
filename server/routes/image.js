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
 * 头像上传
 */
router.post('/head', function(req, res){
    let token = req.header('token');
    checkToken(token, (result) => {
        if (result.status !== 0) {
            res.json(result);
        } else { 
            var form = new multiparty.Form();
            form.parse(req, function(err, fields, files){
                // console.log(req);
                // console.log(files);
                //将前台传来的base64数据去掉前缀
                var imgData = req.body.src.replace(/^data:image\/\w+;base64,/, '');
                var dataBuffer = new Buffer.from(imgData, 'base64');
                //写入文件
                var name = getTimestamp_13()+'_'+getRandom(2)+'.png';
                var picPath = path.join(__dirname,'../public/head/'+name);
                fs.writeFile(picPath, dataBuffer, function(err){
                    if(err){
                        console.log(err);
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
 * 更换头像
 */
router.post('/changehead', function (req, res, next) {
    let {name} = req.body;
    let token = req.header('token');
    // console.log(token);
    checkToken(token, (result) => {
        if (result.status !== 0) {
            res.json(result);
        } else {   
            let uid = result.data.uid;
            // let uid = 1;
            runSql(`update user set uimage=? where uid=?`, [name,uid], (result) => {
                res.json(result);
            });
        }
    });
});

/**
 * 上传主题图片
 */
router.post('/theme', function(req, res){
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
                var picPath = path.join(__dirname,'../public/theme/'+name);
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
 * 上传信纸
 * 请求方式：
 *      POST
 * 接受参数：
 *      
 */
const storage2 = multer.diskStorage({
    // 配置文件上传的位置
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/paper'));
    },
    // 配置上传文件的名称（包含后缀）
    filename: (req, file, cb) => {
        // 文件后缀
        let ext = path.extname(file.originalname);
        cb(null, getTimestamp_13() + '_' + getRandom(2) + ext);
    }
});
const upload2 = multer({storage: storage2});

router.post('/paper', upload2.any(), function (req, res, next) {
    let token = req.header('token');
    checkToken(token, (result) => {
        if (result.status !== 0) {
            res.json(result);
        } else {   
            var filename = req.files[0].filename;
            runSql('insert into paper(ppimage) values(?)  ', [filename], (result1) => {
                let jsonData = {...result1};
                jsonData.data.filename = filename;
                res.json(jsonData);
            });
        }
    })
});

/**
 * 选择背景(私密写)
 * 请求方式：
 *      POST
 * 接受参数：
 *      pid:信件id
 *      bgData：背景的base64编码
 */
router.post('/choosebg', function(req, res){
    let token = req.header('token');
    let {pid} = req.body;
    checkToken(token, (result) => {
        if (result.status !== 0) {
            res.json(result);
        } else {   
            var form = new multiparty.Form();
            form.parse(req, function(err, fields, files){
                //将前台传来的base64数据去掉前缀
                var imgData = req.body.bgData.replace(/^data:image\/\w+;base64,/, '');
                var dataBuffer = new Buffer.from(imgData, 'base64');
                //写入文件
                var name = getTimestamp_13()+'_'+getRandom(2)+'.png';
                var picPath = path.join(__dirname,'../public/pbgimage/'+name);
                fs.writeFile(picPath, dataBuffer, function(err){
                    if(err){
                        res.send(err);
                    }else{
                        runSql('select bgimage,custom from pletter where pid=?',[pid],(result1)=>{
                            var bg = result1.data[0].bgimage;
                            var custom = result1.data[0].custom;
                            if(custom==0){
                                runSql('update pletter set bgimage=?,custom=?,ppid=? where pid=? ',[name,1,null,pid],(result2)=>{
                                })
                            }else{
                                runSql('update pletter set bgimage=?,custom=?,ppid=? where pid=? ',[name,1,null,pid],(result3)=>{
                                    fs.unlinkSync(path.join(__dirname,'../public/pbgimage/'+bg));
                                })
                            }
                            res.json({status: 0, data: [{bg:name,custom:custom}]});
                        })
                    }
                });
            });
        }
    })
});
/**
 * 展示背景（私密写）
 * 请求方式：
 *      GET
 * 接受参数：
 *      pid：信件id
 * 返回参数：
 *      
 */
router.get('/showpbg',function(req,res){
    let token = req.header('token');
    let {pid} = req.query;
    checkToken(token,(result)=>{
        if(result.status !== 0) {
            res.json(result);
        }else{ 
            runSql('select bgimage,custom from pletter where pid=?',[pid],(result1)=>{
                 res.json(result1);
            })
        }
    })
})
/**
 * 删除自定义背景图(私密写)
 * 请求方式
 *      POST
 * 接受参数：
 *      pid：信件id
 *      bgname：自定义背景图名称
 */
router.post('/delbgimg',function(req,res,next){
    let token = req.header('token');
    let {pid,bgname} = req.body;
    checkToken(token,(result)=>{
        if(result.status !==0){
            res.json(result)
        }else{
            runSql('update pletter set bgimage=?,custom=? where pid=?',[null,0,pid],(result2)=>{
                fs.unlinkSync(path.join(__dirname,'../public/pbgimage/'+bgname));
                res.json(result2);
            })
        }
    })
})
/**
 * 插入图片(一起写)
 * 请求方式：
 *      POST
 * 接受参数：
 *      Lid:信件id
 */
router.post('/insertTimg', function(req, res){
    let token = req.header('token');
    let {Lid} = req.body;1
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
                var picPath = path.join(__dirname,'../public/insertimg/'+name);
                fs.writeFile(picPath, dataBuffer, function(err){
                    if(err){
                        res.send(err);
                    }else{
                        // let arr = [];
                        runSql('select insertImg from tletter where Lid=?',[Lid],(result)=>{
                            var img = result.data[0].insertImg;
                            if(img==null){
                                runSql('update tletter set insertImg=? where Lid=? ',[name,Lid],(result1)=>{
                                })
                            }else{
                                runSql('update tletter set insertImg=? where Lid=? ',[img+','+name,Lid],(result1)=>{
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
 * 展示插入图片(一起写)
 * 请求方式：
 *      GET
 * 接受参数：
 *      Lid：信件id
 * 返回参数：
 *      
 */
router.get('/showTimg',function(req,res){
    let token = req.header('token');
    let {Lid} = req.query;

    checkToken(token,(result)=>{
        if(result.status !== 0) {
            res.json(result);
        }else{ 
            runSql('select insertImg from tletter where Lid=?',[Lid],(result1)=>{
                var img = result1.data[0].insertImg;
                //空
                if(img==null){
                    res.json({status: 1, data: []});
                }else{
                    if(img.length==20){
                        res.json({status: 0, data: [img]});
                    }else{
                        // img = img.substring(0,img.length);
                        var arr = img.split(",")
                        res.json({status: 0, data: arr});
                    }
                    
                }
            })
        }
    })
})
/**
 * 删除插入图片(一起写)
 * 请求方式
 *      POST
 * 接受参数：
 *      Lid：信件id
 *      insertImg：图片名称
 */
router.post('/delInsertTimg',function(req,res,next){
    let token = req.header('token');
    let {lid,insertImg} = req.body;
    console.log(lid)
    checkToken(token,(result)=>{
        if(result.status !==0){
            res.json(result)
        }else{
            runSql('select insertImg from tletter where lid=?',[lid],(result1)=>{
                // let img = result1.data[0].insertImg.replaceAll(insertImg+',','');
                let img = result1.data[0].insertImg
                var arr = img.split(",")
                for(var i=0;i<arr.length;i++){
                    if(arr[i]==insertImg){
                        arr.splice(i,1);
                    }
                }
                var strimg = arr.join(",")
                if(result1.data[0].insertImg.length==20){
                    runSql('update tletter set insertImg=? where lid=?',[null,lid],(result2)=>{
                        fs.unlinkSync(path.join(__dirname,'../public/insertimg/'+insertImg));
                        res.json({status: 0});
                    })
                }else{
                    runSql('update tletter set insertImg=? where lid=?',[strimg,lid],(result2)=>{
                        fs.unlinkSync(path.join(__dirname,'../public/insertimg/'+insertImg));
                        res.json({status: 0});
                    })
                }
            })
        }
    })
})
/**
 * 获取首页图片和信息
 * 请求方式：
 *      GET
 * 接受参数：
 * 
 * 返回参数：
 *     uid：用户id
 *     homeBack：首页背景图 ，
 *      signature：个性签名
 */
router.get('/homeImage',function(req,res,next){
    let token = req.header('token');
    checkToken(token,(result)=>{
        if(result.status !== 0){
            res.json(result)
        }else{
            let uid = result.data.uid;
            runSql('select uid,signature,homeBack from user where uid=?',[uid],(result1)=>{
                res.json(result1);
            })
        }
    })
})
/**
 * 更换首页背景图片
 * 请求方式：
 *      POST
 * 接收参数：
 *      src:图片base64位编码
 */
router.post('/changeHomeBack',function(req,res,next){
    let token = req.header('token');
    checkToken(token, (result) => {
        if (result.status !== 0) {
            res.json(result);
        } else {  
            let uid = result.data.uid; 
            var form = new multiparty.Form();
            form.parse(req, function(err, fields, files){
                //将前台传来的base64数据去掉前缀
                var imgData = req.body.imgData.replace(/^data:image\/\w+;base64,/, '');
                var dataBuffer = new Buffer.from(imgData, 'base64');
                //写入文件
                var name = getTimestamp_13()+'_'+getRandom(2)+'.png';
                var picPath = path.join(__dirname,'../public/homeBack/'+name);
                fs.writeFile(picPath, dataBuffer, function(err){
                    if(err){
                        res.send(err);
                    }else{
                        runSql('update user set homeBack=? where uid=? ',[name,uid],(result1)=>{
                            res.json(result1);
                        })
                           
                    }
                });
            });
        }
    })
})
module.exports = router;
