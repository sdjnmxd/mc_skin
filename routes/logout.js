/**
 By 晓迪 | http://mxd.moe | http://weibo.com/sdjnmxd
 Call Me Fox , Plz :D
 At 2015/9/29
 Copy Prohibited
 */

var express = require('express');
var router = express.Router();
var session = require('../modules/session');
var logger = require('../modules/logger');


router.get('/', function (req, res, next) {
    if (session.checkUserSession(req)) {
        logger.consoleLog('logout', '清除session - 成功'.info, req);

        req.session.destroy();
        res.redirect('/member/login');
    } else {
        logger.consoleLog('logout', '不存在session - 清除session失败'.warn, req);

        res.redirect('/member/login');
    }
});

module.exports = router;