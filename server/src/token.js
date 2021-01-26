const jwt = require('jsonwebtoken');

let { secretOrPrivateKey } = require('../config');

function getToken(content, params) { 
    return jwt.sign(content, secretOrPrivateKey, params);
}

function checkToken(token, callback) {
    jwt.verify(token, secretOrPrivateKey, (err, decode)=> {
        if (err) {
            // console.log(err);
            let jsonData = {
                status: -1,
                message: 'err',
                data: {
                    name: err.name,
                    message: err.message
                }
            }
            callback(jsonData);
        } else {
            // console.log(decode);
            let jsonData = {
                status: 0,
                message: 'OK',
                data: decode
            }
            callback(jsonData);
        }
    })
}



// let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjQsImlhdCI6MTU3NDU2NDA5NywiZXhwIjoxNTc0NTY0MTU3fQ.NLYThOInciBbiFl3S5iaUCH203AmdsT3ts7uiV_jn8Q';
// checkToken(token, (result) => {
//     console.log(result);
// });


 module.exports = { getToken, checkToken };
