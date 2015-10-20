/**
 By 晓迪 | http://mxd.moe | http://weibo.com/sdjnmxd
 Call Me Fox , Plz :D
 At 2015/10/3
 Copy Prohibited
 */

var express = require('express');
var router = express.Router();
var session = require('../modules/session');
var logger = require('../modules/logger');
var filer = require('../modules/filer');

router.get('/', function (req, res, next) {
    res.status(405);
    res.send('Method not allowed');
});

router.post('/', function (req, res, next) {
    if (req.files.file != undefined) {
        var file = req.files.file;

        var fileSize = Math.round(file.size / 1024);
        var fileExtension = file.extension;
        var fileName = file.name;

        if (!session.checkUserSession(req)) {
            logger.consoleLog('upload', '上传文件失败,状态码：401 - accessToken异常'.error, req);

            res.status(401);
            res.json({
                statusCode: 401,
                msg: 'accessToken异常，请重新登陆'
            });
        } else if (fileExtension != 'png') {
            logger.consoleLog('upload', '上传文件失败,状态码：415 - 文件格式不正确'.warn, req);

            res.status(415);
            res.json({
                statusCode: 415,
                msg: '文件格式不正确,要求为PNG格式'
            });
        } else if (fileSize > 50) {
            logger.consoleLog('upload', '上传文件失败,状态码：413 - 文件过大'.warn, req);

            res.status(413);
            res.json({
                statusCode: 413,
                msg: '文件过大,要求大小为50KB'
            })
        } else {
            var username = req.session.username;
            var orgFileDir = __dirname + '/../uploads/tmp/' + fileName;
            var skinFileDir = __dirname + '/../uploads/' + username + '.png';

            filer.processFile(orgFileDir, skinFileDir, function (err) {
                if (!err) {
                    logger.consoleLog('upload', '上传文件成功,状态码：200 - AllClear'.info, req);

                    var text = '文件大小：' + fileSize + 'kb\n' + '文件类型：' + fileExtension + '\n' + '文件名称：' + fileName;
                    console.log(text);

                    res.json({
                        statusCode: 200,
                        msg: '上传成功！',
                        url: '/skins/' + username + ".png"
                    });
                } else {
                    logger.consoleLog('upload', '上传文件失败,状态码：500 - 处理上传文件时出错'.error, req);
                    console.log(err);

                    res.status(500);
                    res.json({
                        statusCode: 500,
                        msg: '文件处理过程中发生了错误'
                    });
                }
            });
        }
    } else {
        logger.consoleLog('upload', '上传文件失败,状态码：400 - file为空'.error, req);

        res.status(400);
        res.json({
            statusCode: 400,
            msg: '内部服务器错误，服务器未收到数据'
        });
    }
});

router.delete('/', function (req, res, next) {

});

module.exports = router;