/**
 By ÏþµÏ | http://mxd.moe | http://weibo.com/sdjnmxd
 Call Me Fox , Plz :D
 At 2015/10/03
 Copy Prohibited
 */

var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

module.exports = router;