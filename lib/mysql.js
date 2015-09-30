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

//8b6cf7bcffe42fc90aa5f9554e58ca7f1784b45a2f167fc703d265086df8d37c35a6241722f3f1fe12f41c4e1097ec2320b5496c701c17d54b456e42f6ecd34b
//SELECT `username` , `password` FROM `miaoowu_mc`.`CrazyLogin_accounts` WHERE `username` = "icefox" AND `password` = "";
function checkPassword(username, password) {
    var promise = new Promise(function (resolve, reject) {
        mysql(Config.mysql.from).where({
            username: username,
            password: password
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
    return promise;
}

exports.checkPassword = checkPassword;


