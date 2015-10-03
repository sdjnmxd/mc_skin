/**
 *
 By 晓迪 | http://mxd.moe | http://weibo.com/sdjnmxd
 Call Me Fox , Plz :D
 At 2015/10/3
 Copy Prohibited
 */
var moment = require("moment");

exports.consoleLog = function (req, text) {
    var username = req.session.username || req.body.username;
    var userip = req.session.userip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    var time = moment().format('YYYY-MM-DD HH:mm:ss');

    console.log('[' + time + '] ' + username + '[' + userip + '] ' + text);
};

