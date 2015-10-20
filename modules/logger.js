/**
 By 晓迪 | http://mxd.moe | http://weibo.com/sdjnmxd
 Call Me Fox , Plz :D
 At 2015/10/20
 Copy Prohibited
 */

var moment = require('moment');
var colors = require('colors');

colors.setTheme({
    input: 'grey',
    verbose: 'cyan',
    prompt: 'grey',
    info: 'green',
    data: 'grey',
    help: 'cyan',
    warn: 'yellow',
    debug: 'blue',
    error: 'red'
});

exports.consoleLog = function (where, text, req) {
    var time = moment().format('YYYY-MM-DD HH:mm:ss');
    var timeText = '[' + time + '] ';
    var from = '[' + where + '] ';

    if (req == undefined) {
        var log = timeText.toString().data + from.toString().help + text;

        console.log(log);
    } else {
        var userName = req.session.username || req.body.username;
        var userIp = req.session.userip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        var userNameText = '[' + userName + ']';
        var userIpText = userIp + ' ';

        var log = timeText.toString().data + from.toString().help + userNameText + userIpText + text;
        console.log(log)
    }


};