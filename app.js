var createError = require('http-errors');
var express = require('express');
const fileUpload = require('express-fileupload');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');

// this is our home route
var indexRouter = require('./routes/index');

// add the products routes
var productsRouter = require('./routes/products');

// add the strains route
var strainsRouter = require('./routes/strains');

//Add the users route
var usersRouter = require('./routes/users');

var sessionsRouter = require('./routes/sessions');

var app = express();
app.use(fileUpload());

// use mongoose to connect to mongo
var mongoose = require( 'mongoose' );

////PASSPORT CONFIG

//adding passport
var passport = require('passport');
var session = require('express-session');
var localStrategy = require('passport-local').Strategy;

var config = require( './config/connect' );
mongoose.connect( config.db );

//Passport Config
app.use(session({
  secret:'staticsalt', //Salt key for hashing
  resave: true, //Maintains session state throughout app
  saveUninitialized: false //Does not initialize session for guests
}))

app.use(passport.initialize());
app.use(passport.session());

//Reference our user model
const User = require('./models/user');
passport.use( User.createStrategy());

//Session Management for users
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Our helper
app.use(function(req,res,next){
  res.locals.autheticated = req.isAuthenticated();
  next();
});

////PASSPORT CONFIG END

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

// this is our home route
app.use('/', indexRouter);

// this is our products router
app.use('/products', productsRouter);

// this is our strains router
app.use('/strains',strainsRouter);

//This is our users router
app.use('/users', usersRouter);

//This is our sessions router
app.use('/sessions', sessionsRouter);

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
