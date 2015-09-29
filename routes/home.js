var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    if (!req.session.username) {
        res.redirect('/member/login');
        return;
    }

    res.render('member/home');
});

module.exports = router;