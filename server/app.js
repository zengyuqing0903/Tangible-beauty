var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const cors = require('cors');

// var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var featuredRouter = require('./routes/featured');
var publishRouter = require('./routes/publish');
var commentRouter = require('./routes/comment');
var mineRouter = require('./routes/mine');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));


app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: false,limit: '50mb'}));
 
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.use('/v1/users', usersRouter);
app.use('/v1/featured',featuredRouter);
app.use('/v1/publish',publishRouter);
app.use('/v1/comment',commentRouter);
app.use('/v1/mine',mineRouter);
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
