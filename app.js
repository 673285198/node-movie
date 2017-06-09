const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');


const bodyParser = require('body-parser');
const connect = require('connect');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);


const ejs = require('ejs'); // 将ejs修改为html

const app = express();


// 连接数据库
const mongoose = require('mongoose');
const dbUrl = 'mongodb://localhost/movie';
mongoose.connect(dbUrl);
mongoose.set('debug',true); // Mongoose操作日志


// view engine setup
app.set('views', path.join(__dirname, './app/views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev')); // web操作日志
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(session({
    secret: 'lujing',
    store: new MongoStore({
        url: dbUrl,
        collection: 'sessions'
    })
}));



require('./config/routes')(app);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
