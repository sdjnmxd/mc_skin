/**
 By 晓迪 | http://mxd.moe | http://weibo.com/sdjnmxd
 Call Me Fox , Plz :D
 At 2015/9/28
 Copy Prohibited
 */
var crazyLogin = require('../lib/crazylogin');
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

exports.checkUserPassword = function checkUserPassword(username, password) {
    var hashPassword = crazyLogin.crazyCrypt1(username,password);

    return new Promise(function (resolve, reject) {
        mysql(Config.mysql.from).where({
            username: username,
            password: hashPassword
        }).select('username').then(function (rows) {
            if (rows.length == 0) {
                reject(2);
            } else {
                resolve(1);
            }
        }, function (error) {
            reject(3);
        })
    });
};


