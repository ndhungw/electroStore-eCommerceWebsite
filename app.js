var createError = require('http-errors');
var express = require('express');
var expressSession = require('express-session');
var bodyParser = require('body-parser');
var flash = require('connect-flash');

var path = require('path');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressHbs = require('express-handlebars');//my added
var Database = require('./db/database');//my added

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var userAccountsRouter = require('./routes/userAccount');
var productFilter = require('./routes/filter');
var app = express();
//require('dotenv').config()//my added

// view engine setup
// // app.set('views', path.join(__dirname, 'views'));
// // app.set('view engine', 'hbs');
app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));//my added
app.set('view engine', '.hbs');//my added

app.use(logger('dev'));
app.use(express.json());

//app.use(express.urlencoded({ extended: false }));

//app.use(session());
app.use(cookieParser());

app.use(expressSession({secret: 'keyboard cat'}))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


app.post('/login', userAccountsRouter);
app.post('/register', userAccountsRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products',productsRouter);
app.use('/filter',productFilter);

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