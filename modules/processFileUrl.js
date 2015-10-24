/**
 By 晓迪 | http://mxd.moe | http://weibo.com/sdjnmxd
 Call Me Fox , Plz :D
 At 2015/10/23
 Copy Prohibited
 */
var filer = require('../modules/filer');
var util = require('util');

exports.processSkin = function (userName, callback) {
    filer.isSkinExists(userName, function (exists) {
        if (exists) {
            callback(null, util.format( '已上传，<a onclick="setPreviewImg(\'/skins/%s.png\')">点击预览</a>', userName));
        } else {
            callback(null, '未上传');
        }
    });
};

exports.processCape = function (userName, callback) {
    filer.isCapeExists(userName, function (exists) {
        if (exists) {
            callback(null, util.format( '已上传，<a onclick="setPreviewImg(\'/capes/%s.png\')">点击预览</a>', userName));
        } else {
            callback(null, '未上传');
        }
    });
};