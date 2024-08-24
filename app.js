//@ts-check
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require("dotenv").config()

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var hanTuRouter = require('./routes/HanTu.route');
var capDoRouter = require('./routes/CapDo.route');
var chuDeRouter = require('./routes/ChuDe.route');
var giaoTrinhRouter = require('./routes/GiaoTrinh.route');
var tuVungRouter = require('./routes/TuVung.route');
var blockRouter = require('./routes/Block.route');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/han-tu', hanTuRouter);
app.use('/cap-do', capDoRouter);
app.use('/chu-de', chuDeRouter);
app.use('/giao-trinh', giaoTrinhRouter);
app.use('/tu-vung', tuVungRouter);
app.use('/block', blockRouter);
app.use('/error', async (req, res, next) => {
  var message = req.query.message;
  res.render('partials/errorPopup', { message, title : "Lỗi"});
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
