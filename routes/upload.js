/**
 By 晓迪 | http://mxd.moe | http://weibo.com/sdjnmxd
 Call Me Fox , Plz :D
 At 2015/10/3
 Copy Prohibited
 */

var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.status(405);
    res.send("Method not allowed");
});

router.post('/', function (req, res, next) {
    if (req.files != undefined) {
        var fileSize = Math.round(req.files.file.size / 1024);
        var fileExtension = req.files.file.extension;
        var fileName = req.files.file.name;

        console.log(fileSize);

        if (fileSize > 50) {
            res.status(413);
            res.send("上传失败，文件过大");
        } else if (fileExtension != 'png') {
            res.status(415);
            res.send("上传失败，文件格式不支持");
        }
        var text = '文件大小：' + fileSize + 'kb\n' + '文件类型：' + fileExtension + '\n' + '文件名称：' + file_name;
        console.log(text);
    } else {
        res.status(400);
        res.send('上传失败，服务器未收到文件');
    }
});


module.exports = router;