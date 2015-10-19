/**
 By 晓迪 | http://mxd.moe | http://weibo.com/sdjnmxd
 Call Me Fox , Plz :D
 At 2015/10/3
 Copy Prohibited
 */

var express = require('express');
var router = express.Router();
var session = require('../modules/session');

router.get('/', function (req, res, next) {
    res.status(405);
    res.send('Method not allowed');
});

router.post('/', function (req, res, next) {
    if (req.files != undefined) {
        var file = req.files.file;

        var fileSize = Math.round(file.size / 1024);
        var fileExtension = file.extension;
        var fileName = file.name;

        if (fileSize > 50) {
            res.status(413);
            res.json({
                statusCode: 413,
                msg: '文件过大,要求小于等于50KB'
            })
        } else if (fileExtension != 'png') {
            res.status(415);
            res.json({
                statusCode: 413,
                msg: '文件格式不正确,要求为PNG格式'
            });
        } else if (!session.checkUserSession(req)) {
            res.status(401);
            res.json({
                statusCode: 401,
                msg: 'accessToken异常，请登陆'
            });
        } else {
            var text = '文件大小：' + fileSize + 'kb\n' + '文件类型：' + fileExtension + '\n' + '文件名称：' + fileName;
            //console.log(text);
            res.json({
                statusCode: 200,
                msg: '上传成功！'
            });
        }
    } else {
        res.status(400);
        res.json({
            statusCode: 400,
            msg: '内部服务器错误，服务器未收到数据'
        });
    }
});


module.exports = router;