/**
 By 晓迪 | http://mxd.moe | http://weibo.com/sdjnmxd
 Call Me Fox , Plz :D
 At 2015/9/28
 Copy Prohibited
 */

var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    var username = req.session.username;
    var userip = req.session.userip;
    var remoteip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    if (!username && !userip != remoteip ) {
        res.redirect('/member/login');
        return;
    }

    res.render('member/home', {
        title: '皮肤管理 - 抖喵Craft',
        header_description: '在这你可以上传你的皮肤或披风，并管理他们',
        username: username
    });
});

module.exports = router;