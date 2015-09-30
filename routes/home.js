/**
 By 晓迪 | http://mxd.moe | http://weibo.com/sdjnmxd
 Call Me Fox , Plz :D
 At 2015/9/28
 Copy Prohibited
 */

var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    if (!req.session.username && req.session.userip) {
        res.redirect('/member/login');
        return;
    }

    res.render('member/home', {
        title: '皮肤管理 - 抖喵Craft',
        header_description: '在这你可以上传你的皮肤或披风，并管理他们'
    });
});

module.exports = router;