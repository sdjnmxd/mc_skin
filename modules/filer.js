/**
 By 晓迪 | http://mxd.moe | http://weibo.com/sdjnmxd
 Call Me Fox , Plz :D
 At 2015/10/20
 Copy Prohibited
 */

var fs = require('fs');

exports.processFile = function (file, where, callback) {
    fs.createReadStream(file).pipe(fs.createWriteStream(where)).on('close', function () {
        fs.unlink(file, callback);
    }).on('error', callback);
};