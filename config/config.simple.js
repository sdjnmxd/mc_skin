/**
 By 晓迪 | http://mxd.moe | http://weibo.com/sdjnmxd
 Call Me Fox , Plz :D
 At 2015/9/28
 Copy Prohibited
 */

module.exports = {
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
    }
};