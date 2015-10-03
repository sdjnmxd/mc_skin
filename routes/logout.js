/**
 By 晓迪 | http://mxd.moe | http://weibo.com/sdjnmxd
 Call Me Fox , Plz :D
 At 2015/9/29
 Copy Prohibited
 */

var express = require('express');
var router = express.Router();
var session = require('../modules/session');

router.get('/', function (req, res, next) {
    var username = req.session.username;
    var remoteip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    if (session.checkUserSession(req)) {  //如果session存在
        console.log(username + "[" + remoteip + "] " + "清除session成功");

        req.session.destroy();  //毁掉这个session
        res.redirect('/member/login');  //跳转到login页面
    } else {
        console.log('un logout');
        res.redirect('/member/login');
    }
});

module.exports = router;