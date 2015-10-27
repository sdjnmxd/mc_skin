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
var logger = require('../modules/logger');


router.get('/', function (req, res, next) {
    if (session.checkUserSession(req)) {
        logger.consoleLog('login', '存在session - 扔到home页面'.info, req);

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
    var remoteip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    user.checkUserPassword(username, password).then(function (success) {
        req.session.username = username;
        req.session.userip = remoteip;

        logger.consoleLog('login', '密码校验通过，存为新session - 登陆成功'.info, req);

        res.json({
            statusCode: 200,
            msg: '登陆成功，正在跳转...'
        })
    }, function (error) {
        if (error == 2) {
            logger.consoleLog('login', '密码错误 - 登陆失败'.warn, req);

            res.status(401);
            res.json({
                statusCode: 401,
                msg: '登陆失败，用户名或密码错误'
            });
        } else if (error == 3) {
            logger.consoleLog('login', '数据库连接错误 - 登陆失败'.warn, req);

            res.status(500);
            res.json({
                statusCode: 500,
                msg: '登录失败，数据库连接错误！'
            });
        }
    })
});

module.exports = router;