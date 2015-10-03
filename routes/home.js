/**
 By 晓迪 | http://mxd.moe | http://weibo.com/sdjnmxd
 Call Me Fox , Plz :D
 At 2015/9/28
 Copy Prohibited
 */

var express = require('express');
var router = express.Router();
var session = require('../modules/session');
var userlog = require('../modules/userlog');

router.get('/', function (req, res, next) {
    var username = req.session.username;

    if (!session.checkUserSession(req)) {
        userlog.consoleLog(req, '[home]不存在session，扔回登陆页');
        res.redirect('/member/login');
        return;
    } else {
        userlog.consoleLog(req, '[home]存在session，无需登陆');
    }

    res.render('member/home', {
        title: '皮肤管理 - 抖喵Craft',
        header_description: '在这你可以上传你的皮肤或披风，并管理他们',
        username: username
    });
});

module.exports = router;