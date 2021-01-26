module.exports = {
    // 邮件配置
    email: {
        host: 'smtp.qq.com',
        service: 'QQ',
        username: 'yifeng.app@foxmail.com',
        password: 'nynahqvyutswbifj'
    },

    // 短信配置
    message: {
        appid: 1400284799,
        appkey: "b3b331decab8271df77fad5d557536b6",
        smsSign: "lemono",  // 签名内容 (不是'签名ID')
        templateId: 468460  // 短信模板 ID
    },

    // 数据库配置
    mysql: {
        host: 'rm-2zei6e8201i35l00rko.mysql.rds.aliyuncs.com',  // 本地用这个
        // host: 'rm-2zei6e8201i35l00r.mysql.rds.aliyuncs.com',  // 服务器用这个
        user: 'yf',
        password: 'Jht952727',
        database: 'yifeng',
        port: 3306
    },

    // token key
    secretOrPrivateKey: "yifenghaha"


}

