/**
 By 晓迪 | http://mxd.moe | http://weibo.com/sdjnmxd
 Call Me Fox , Plz :D
 At 2015/10/28
 Copy Prohibited
 */

module.exports = {
  skins: {
    port: 80  //监听端口
  },
  cookie: {
    cookieParser: 'iebri!@FCEUgq2h3912h(1'  //生产服务器必须修改
  },
  session: {
    secret: 'q320ihrf9jhwpignb2yh49n1i2ed', //生产服务器必须修改
    name: 'PHPSESSID',   //只是一个伪装
    reSave: 'false',
    saveUninitialized: 'false',
    ttl: 60 * 60 * 24  //session过期时间
  },
  mysql: {
    hostname: 'localhost',  //mysql主机地址
    port: '3306',  //mysql端口号
    username: 'root',  //mysql登陆用户名
    password: '',  //mysql密码
    db: '',  //mysql数据库
    from: 'CrazyLogin_accounts'  //Minecraft的CrazyLogin库
  },
  redis: {
    host: 'localhost',   //redis主机地址
    port: '6379',  //redis
    db: 15  //db序号
  },
  file: {
    tmpPath: __dirname + '/../uploads/tmp/',  //上传临时目录
    skinsPath: __dirname + '/../uploads/skins/',  //皮肤目录
    capePath: __dirname + '/../uploads/capes/'  //披风目录
  },
  debug_log: {
    enable: false  //调试日志是否开启
  }
};


