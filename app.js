var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var index = require('./routes/index');
var individual = require('./routes/individual');
var legalentity = require('./routes/legalentity');
var contracts = require('./routes/contracts');
var added = require('./routes/added');
var update = require('./routes/update');
var remove = require('./routes/remove');
var coveringletter = require('./routes/coveringletter');
var newtemplates = require('./routes/newtemplates');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/individual', individual);
app.use('/legalentity', legalentity);
app.use('/contracts', contracts);
app.use('/added', added);
app.use('/update', update);
app.use('/remove', remove);
app.use('/coveringletter', coveringletter);
app.use('/newtemplates', newtemplates);

// mongoose
mongoose.connect('mongodb://localhost/dbautodoc');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;