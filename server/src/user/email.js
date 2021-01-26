const nodemailer = require("nodemailer");
const {email} = require("../../config");

// 定义邮件服务器
var transporter = nodemailer.createTransport({
    host: email.host,
    service: email.service,
    secure: true,
    auth: {
        user: email.username,
        pass: email.password
    }
});

// 发送函数
function sendEmail (sendTo, verification, minute, callback) {
    
    var sendHtml = `
        <p>尊敬的用户，您的验证码为：${verification}，请于${minute}分钟内填写。</p>
        <p>如非本人操作，请忽略本邮件。</p>
        <p>-- 来自一封App</p>
    `;
    
    var mailOptions = {
        from: email.username,  // 发送邮件的地址
        to: sendTo,  // 接收邮件的地址
        subject: '一封App - 验证码',  // 邮件主题
        html: sendHtml  // 以HTML的格式显示
    };

    // 发送邮件
    transporter.sendMail(mailOptions, function (error, info) {
        var result = {};
        if (error) {
            result = {status: -1, message: error};
        } else {
            result = {status: 0, message: info};
        }
        return callback(result);
    });
}

module.exports = sendEmail;
