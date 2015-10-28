/**
 By 晓迪 | http://mxd.moe | http://weibo.com/sdjnmxd
 Call Me Fox , Plz :D
 At 2015/10/28
 Copy Prohibited
 */

var debug = true;

if (debug == true) {
    //开发环境配置
    module.exports = {
        skins: {
            port: 80
        },
        mysql: {
            hostname: 'www.miaoowu.com',
            port: '13306',
            username: 'miaoowu_mc',
            password: 'miaoowu_mc',
            db: 'miaoowu_mc',
            from: 'CrazyLogin_accounts'
        },
        redis: {
            host: 'www.miaoowu.com',
            port: '16379',
            db: 15,
            ttl: 60 * 60 * 24
        },
        file: {
            tmpPath: __dirname + '/../uploads/tmp/',
            skinsPath: __dirname + '/../uploads/skins/',
            capePath: __dirname + '/../uploads/capes/'
        },
        debug_log: {
            enable: true
        }
    };
} else {
    //生产环境配置
    module.exports = {
        skins: {
            port: 80
        },
        mysql: {
            hostname: '10.10.10.1',
            port: '3306',
            username: 'miaoowu_mc',
            password: 'miaoowu_mc',
            db: 'miaoowu_mc',
            from: 'CrazyLogin_accounts'
        },
        redis: {
            host: '10.10.10.1',
            port: '6379',
            db: 15,
            ttl: 60 * 60 * 24
        },
        file: {
            tmpPath: __dirname + '/../uploads/tmp/',
            skinsPath: __dirname + '/../uploads/skins/',
            capePath: __dirname + '/../uploads/capes/'
        },
        debug_log: {
            enable: false
        }
    };
}

