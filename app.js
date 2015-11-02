var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var redisStore = require('connect-redis')(session);
var multer = require('multer');

var routes = require('./routes/index');
var login = require('./routes/login');
var home = require('./routes/home');
var logout = require('./routes/logout');
var upload = require('./routes/upload');

var config = require('./config/config');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// init debug_log
if (config.debug_log.enable) {
    app.use(logger('combined'));
}

//bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//init cookie
app.use(cookieParser('124e09ur1j3fgioq23ure12iphr'));

//init session
app.use(session({
    store: new redisStore({
        host: config.redis.host,
        port: config.redis.port,
        db: config.redis.db,
        ttl: config.redis.ttl
    }),
    name: 'PHPSESSID', //只是一个伪装
    resave: false,
    saveUninitialized: false,
    secret: 'q320ihrf9jhwpignb2yh49n1i2ed'
}));

//init static
app.use(express.static(path.join(__dirname, 'public')));
app.use('/skins', express.static(path.join(__dirname, 'uploads/skins')));
app.use('/capes', express.static(path.join(__dirname, 'uploads/capes')));

//init uploader
app.use(multer({dest: 'uploads/tmp/'})); //上传临时目录

app.use('/', routes);
app.use('/member/login', login);
app.use('/member/home', home);
app.use('/member/logout', logout);
app.use('/upload', upload);

if (config.debug_log.enable) {
    app.use(function (req, res, next) {
        var err = new Error('404');
        err.status = 404;
        next(err);
    });

    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
} else {
    app.use(function (req, res, next) {
        var err = new Error('PHP Error');
        err.status = 404;
        next(err);
    });

    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
}

module.exports = app;
