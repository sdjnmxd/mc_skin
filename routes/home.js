/**
 By 晓迪 | http://mxd.moe | http://weibo.com/sdjnmxd
 Call Me Fox , Plz :D
 At 2015/9/28
 Copy Prohibited
 */

var express = require('express');
var router = express.Router();
var session = require('../modules/session');
var logger = require('../modules/logger');
var async = require('async');
var fileProcesser = require('../modules/processFileUrl');

router.get('/', function (req, res, next) {
    var userName = req.session.username;

    async.parallel([
        function (callback) {
            fileProcesser.processSkin(userName, callback);
        },
        function (callback) {
            fileProcesser.processCape(userName, callback)
        }
    ], function (error, result) {
        if (!session.checkUserSession(req)) {
            logger.consoleLog('home', '不存在session - 扔回登陆页'.warn, req);

            res.redirect('/member/login');
            return;
        } else {
            logger.consoleLog('home', '存在session - 无需登陆'.info, req);
        }
        res.render('member/home', {
            title: '皮肤管理 - 抖喵Craft',
            header_description: '在这你可以上传你的皮肤或披风，并管理它们',
            username: userName,
            skinurl: result[0],
            capeurl: result[1]
        });
    });


});

module.exports = router;