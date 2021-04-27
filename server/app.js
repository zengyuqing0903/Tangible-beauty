var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const cors = require('cors');

// var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var pLetterRouter = require('./routes/pLetter');
var tLetterRouter = require('./routes/tLetter');
var sLetterRouter = require('./routes/showLetter');
var mineRouter = require('./routes/mine');
var mailboxRouter = require('./routes/mailbox');
var imageRouter = require('./routes/image');
var adminLogin = require('./routes/adminlogin');
var adminManager = require('./routes/adminManager');
var userManager = require('./routes/userManager');
var paperManager = require('./routes/paperManager');
var countRouter = require('./routes/adminStatistics');
var adminLetterManage = require('./routes/adminletterManage');
var musicRouter = require('./routes/music');
var openRouter = require('./routes/openletter');
var signRouter = require('./routes/signIn');
var helpRouter = require('./routes/help');
var openManager = require('./routes/openManager')
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
app.use('/v1/private', pLetterRouter);
app.use('/v1/showletter', sLetterRouter);
app.use('/v1/together',tLetterRouter)
app.use('/v1/mine',mineRouter);
app.use('/v1/mailbox',mailboxRouter);
app.use('/v1/image',imageRouter);
app.use('/v1/adminlogin',adminLogin);
app.use('/v1/adminmanager',adminManager);
app.use('/v1/usermanager',userManager);
app.use('/v1/papermanager',paperManager);
app.use('/v1/analy',countRouter);
app.use('/v1/adminletman',adminLetterManage);
app.use('/v1/music',musicRouter);
app.use('/v1/public',openRouter);
app.use('/v1/signIn',signRouter);
app.use('/v1/help',helpRouter);
app.use('/v1/openManager',openManager);
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
