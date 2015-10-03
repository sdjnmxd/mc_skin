/**
 By 晓迪 | http://mxd.moe | http://weibo.com/sdjnmxd
 Call Me Fox , Plz :D
 At 2015/9/26
 Copy Prohibited
 */

var express = require('express');
var router = express.Router();
var user = require('../models/user');
var session = require('../modules/session');
var userlog = require('../modules/userlog');


router.get('/', function (req, res, next) {
    if (session.checkUserSession(req)) {
        userlog.consoleLog(req, '[login]存在session，无需登陆');
        res.redirect('/member/home');
        return;
    } else {
        userlog.consoleLog(req, '[login]不存在session，需要登陆');
    }

    res.render('member/login', {
        title: '用户登录 - 抖喵Craft',
        header_description: '请输入游戏ID和密码 | 然后点击“登录”'
    });
});

router.post('/', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var remoteip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    user.checkUserPassword(username, password).then(function (success) {
        req.session.username = username;
        req.session.userip = remoteip;

        userlog.consoleLog(req, '[login]登陆成功');

        res.status(200);
        res.send('登陆成功');
    }, function (error) {
        if (error == 2) {
            userlog.consoleLog(req, '[login]登录失败，密码错误');

            res.status(401);
            res.send("用户名或密码错误");
        } else if (error == 3) {
            userlog.consoleLog(req, '[login]登录失败，数据库连接错误');

            res.status(500);
            res.send('登录失败，数据库连接错误');
        }
    })
});

module.exports = router;