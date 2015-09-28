/**
 By 晓迪 | http://mxd.moe | http://weibo.com/sdjnmxd
 Call Me Fox , Plz :D
 At 2015/9/28
 Copy Prohibited
 */
var Config = require('../config/config');

var mysql = require("knex")({
    client: 'mysql',
    connection: {
        host: Config.mysql.hostname,
        port: Config.mysql.port,
        user: Config.mysql.username,
        password: Config.mysql.password,
        database: Config.mysql.db
    }
});

function hasUser(username, password) {
    var promise = new Promise(function (resolve, reject) {
        mysql(Config.mysql.from).where({
            username: username,
            password: password
        }).select('username').then(function (rows) {
            if (rows.length != 0) {
                if (rows[0].username == username) {
                    resolve('欢迎登陆');
                } else {
                    reject('密码错误');
                }
            } else {
                reject('用户不存在');
            }
        }, function(error) {
            reject('数据库连接错误');
            console.log(error);
        })
    });

    return promise;
}


exports.hasUser = hasUser;


