var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);

var routes = require('./routes/index');
var login = require('./routes/login');
var home = require('./routes/home');
var logout = require('./routes/logout');
//var register = require('./routes/register');
var config = require('./config/config');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//设置cookie
app.use(cookieParser('what is this ?'));

//设置session
app.use(session({
    store: new RedisStore({
        host: config.redis.host,
        port: config.redis.port,
        db: config.redis.db,
        ttl: config.redis.ttl
    }),
    secret: 'what is this ?'
}));
app.use(express.static('public'));

app.use('/', routes);
app.use('/member/login', login);
app.use('/member/home', home);
app.use('/member/logout', logout);

//app.use('/member/register', register);


app.use(function (req, res, next) {
    var err = new Error('40404040404040404040404040404040404004040');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
