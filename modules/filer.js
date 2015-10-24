/**
 By 晓迪 | http://mxd.moe | http://weibo.com/sdjnmxd
 Call Me Fox , Plz :D
 At 2015/10/20
 Copy Prohibited
 */

var fs = require('fs');
var config = require('../config/config');

exports.copyFile = function (file, where, callback) {
    fs.createReadStream(file).pipe(fs.createWriteStream(where)).on('close', callback);
};

exports.delFile = function (file, callback) {
    fs.unlink(file, callback);
};

exports.isSkinExists = function (username, callback) {
    fs.exists(config.file.skinsPath + username + '.png', callback);
};

exports.isCapeExists = function (username, callback) {
    fs.exists(config.file.capePath + username + '.png', callback);
};