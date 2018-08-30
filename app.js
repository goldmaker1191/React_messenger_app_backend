var createError = require('http-errors');
var express = require('express');
var path = require('path');
var proxy = require('express-http-proxy');

var app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/sanctions', function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Method', 'GET, POST, PUT, DELETE, PATCH');
  return proxy('https://secure.underwriting-support.com:443/fst/api/fst_api.php').apply(null, arguments);
});

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

