/**
 By 晓迪 | http://mxd.moe | http://weibo.com/sdjnmxd
 Call Me Fox , Plz :D
 At 2015/9/26
 Copy Prohibited
 */

var crypto = require('crypto');

exports.crazyCrypt1 = function crazyCrypt1(username, password) {
    var sha512 = crypto.createHash('sha512');
    var text = [new Buffer('c39cc384616575742f2f262f3d4920', 'hex'),
        new Buffer(password),
        new Buffer('37343231e282ac353437', 'hex'),
        new Buffer(username),
        new Buffer('5f5f2b49c3844948c2a7254e4b20', 'hex'),
        new Buffer(password)];
    text = text.reduce(function merge(str, buffer) {
        return str += buffer.toString();
    }, '');

    text = text.substr(0, text.length - 6);
    text = new Buffer(text);
    var buffer = sha512.update(text).digest();
    return buffer.toString('hex');
};