var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();
var hbs = require('hbs');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerHelper("ifequals", function (a, b, options) {
  if (a === b)
    return options.fn(this);
  else
    return options.inverse(this);
})
hbs.registerHelper("ifbothequals", function (a, b, c, options) {
  if (a === b || a === c)
    return options.fn(this);
  else
    return options.inverse(this);
})

hbs.registerHelper("checkRegistered", function (a, b, options) {
  if (a && b) {
    const chkStr = a.substring(0, 10)
    if (chkStr === b) {
      return options.fn(this);
    }
  }
  else
    return options.inverse(this);
})
app.use('/', indexRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
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
