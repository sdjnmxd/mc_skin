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
    },
    pool: {
        min: 0,
        max: 7
    }
});

function hasUser(username, password ,callback) {
    var idk = mysql.select('username').from(Config.mysql.from);
    
    return idk;
}

exports.hasUser = hasUser;


