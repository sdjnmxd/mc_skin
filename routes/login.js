/**
 By 晓迪 | http://mxd.moe | http://weibo.com/sdjnmxd
 Call Me Fox , Plz :D
 At 2015/9/26
 Copy Prohibited
 */

var express = require('express');
var router = express.Router();
var crypt = require('../lib/Crypt');
var mysql = require('../lib/mysql');


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('member/login', {
        title: '皮肤系统 - 抖喵Craft',
        header_description: '请输入游戏ID和密码 | 然后点击“登录”'
    });
});

router.post('/', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    var text = crypt.CrazyCrypt1(username, password);

    console.log('用户名：' + username);
    console.log('用户明文密码：' + password);
    console.log('用户加密后密码：' + text);

    mysql.hasUser(username, text).then(function (success) {
        //promise success
        console.log(success);
        return success;
    }, function (error) {
        //promise error
        console.log(error);
        return error;
    })
});

module.exports = router;