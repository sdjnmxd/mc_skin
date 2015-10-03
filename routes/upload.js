/**
 By 晓迪 | http://mxd.moe | http://weibo.com/sdjnmxd
 Call Me Fox , Plz :D
 At 2015/10/3
 Copy Prohibited
 */

var express = require('express');
var router = express.Router();
var multer = require('multer')
var upload = multer({dest: './uploads/'});

router.get('/', function (req, res, next) {
    res.status(405);
    res.send("Method not allowed");
});

router.post('/', function (req, res, next) {
    console.log(req.file);
});


module.exports = router;