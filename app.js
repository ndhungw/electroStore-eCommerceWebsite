var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var createError = require('http-errors');
var express = require('express');
var expressHbs = require('express-handlebars');//my added
var session = require('express-session');
var flash = require('connect-flash');
var logger = require('morgan');
var path = require('path');
var passport = require('passport');

//Database
var Database = require('./db/database');//my added

//Passport config
require('./config/passport')(passport);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var userAccountsRouter = require('./routes/userAccount');
var productFilter = require('./routes/filter');
checkoutRouter = require('./routes/checkoutRouter');

var handlebarsHelper = require('./controllers/HandlebarsHelper');

var app = express();
//require('dotenv').config()//my added

// view engine setup
// // app.set('views', path.join(__dirname, 'views'));
// // app.set('view engine', 'hbs');
app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));//my added
app.set('view engine', '.hbs');//my added

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({   // to support URL-encoded bodies
  extended: true
})); 

// Express session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global vars
app.use( (req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.verification_msg = req.flash('verification_msg');
  next();
});

app.use(function(req,res,next)
{
  res.locals.user = req.user;
  
  if (req.query.search)
  {
    res.locals.search = req.query.search;
  }

  if (req.query.brand)
  {
    res.locals.brand = req.query.brand;
  }

  if (req.query.price)
  {
    res.locals.price = req.query.price;
  }

  if (req.query.sort)
  {
    res.locals.sort = req.query.sort;
  }

  if (req.query.by)
  {
    res.locals.order = req.query.by;
  }
  next();
})

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products',productsRouter);
app.use('/filter',productFilter);
app.use('/checkout', checkoutRouter);

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