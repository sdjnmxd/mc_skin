/**
 By 晓迪 | http://mxd.moe | http://weibo.com/sdjnmxd
 Call Me Fox , Plz :D
 At 2015/9/29
 Copy Prohibited
 */

var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    var username = req.session.username;
    var userip = req.session.userip;
    var remoteip = req.headers['x-forwarded-for'];

    if (username && userip) {  //如果session存在
        console.log(username + "[" + remoteip + "] " + "清除session成功");

        req.session.destroy();  //毁掉这个session
        res.redirect('/member/login');  //跳转到login页面
    } else {
        res.redirect('/member/login');
    }
});

module.exports = router;