/**
 By 晓迪 | http://mxd.moe | http://weibo.com/sdjnmxd
 Call Me Fox , Plz :D
 At 2015/9/26
 Copy Prohibited
 */

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('member/register', {
        title: '皮肤系统 - 抖喵Craft',
        header_description: '请输入游戏ID和密码 | 然后点击“注册”'
    });
});

router.post('/', function (req, res, next) {
    console.log(req.body);

});

module.exports = router;