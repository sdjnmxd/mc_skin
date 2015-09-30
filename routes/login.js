/**
 By 晓迪 | http://mxd.moe | http://weibo.com/sdjnmxd
 Call Me Fox , Plz :D
 At 2015/9/26
 Copy Prohibited
 */

var express = require('express');
var router = express.Router();
var crypt = require('../lib/crypt');
var mysql = require('../lib/mysql');

router.get('/', function (req, res, next) {
    if (req.session.username) {
        res.redirect('/member/home');
        return;
    }

    res.render('member/login', {
        title: '用户登录 - 抖喵Craft',
        header_description: '请输入游戏ID和密码 | 然后点击“登录”'
    });
});

router.post('/', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var text = crypt.crazyCrypt1(username, password);
    var userip = req.connection.remoteAddress;

    mysql.checkPassword(username, text).then(function (success) {
        console.log(username + "[" + userip + "] " + "登陆成功");

        req.session.username = username;
        res.send('登陆成功');
        res.status(200).end();
    }, function (error) {
        if (error == 2) {
            console.log(username + '[' + userip + ']' + "登录失败，密码错误");

            res.send("用户名或密码错误");
            res.status(401).end();
        } else if (error == 3) {
            console.log(username + '[' + userip + ']' + "登录失败，数据库连接错误");

            res.send('登录失败，数据库连接错误');
            res.status(401).end();
        }
    })
});

module.exports = router;