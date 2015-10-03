/**
 By 晓迪 | http://mxd.moe | http://weibo.com/sdjnmxd
 Call Me Fox , Plz :D
 At 2015/9/29
 Copy Prohibited
 */

var express = require('express');
var router = express.Router();
var session = require('../modules/session');
var userlog = require('../modules/userlog');


router.get('/', function (req, res, next) {
    if (session.checkUserSession(req)) {
        userlog.consoleLog(req, '[logout]清除session成功');
        req.session.destroy();
        res.redirect('/member/login');
    } else {
        userlog.consoleLog(req, '[logout]不存在session，扔回登陆页');
        res.redirect('/member/login');
    }
});

module.exports = router;