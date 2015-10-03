/**
 By 晓迪 | http://mxd.moe | http://weibo.com/sdjnmxd
 Call Me Fox , Plz :D
 At 2015/10/3
 Copy Prohibited
 */

exports.checkUserSession = function checkUserSession(req) {
    var username = req.session.username;
    var userip = req.session.userip;
    var remoteip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    if (username && remoteip == userip) {
        return true
    }
};