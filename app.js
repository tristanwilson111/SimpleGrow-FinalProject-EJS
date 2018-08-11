const createError = require('http-errors');
const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');

//Routes
const indexRouter = require('./routes/index');
const strainsRouter = require('./routes/strains');
const usersRouter = require('./routes/users');
const sessionsRouter = require('./routes/sessions');

//Utilize express' upload file funtion
var app = express();
app.use(fileUpload());

var mongoose = require( 'mongoose' );

//Passport User Authentication
const passport = require('passport');
const session = require('express-session');
const localStrategy = require('passport-local').Strategy;

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

app.use(function(req,res,next){
  res.locals.autheticated = req.isAuthenticated();
  next();
});

//View Engine
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

//Include our routes
app.use('/', indexRouter);
app.use('/strains',strainsRouter);
app.use('/users', usersRouter);
app.use('/sessions', sessionsRouter);

// 404 Error Handling
app.use(function(req, res, next) {
  next(createError(404));
});

// Error Handling
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  //Render Error Page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
