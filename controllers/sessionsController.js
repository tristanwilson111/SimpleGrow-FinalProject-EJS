const User = require('../models/user');
const passport = require('passport');

exports.new = function (req,res,next) {
    let locals = {
        title: 'User Login',
        messages: req.session.messages || []
    }
    
    req.session.messages = []

    res.render('sessions/new', locals)
}

exports.create = function (req,res,next) {
    passport.authenticate(
        'local', 
        {
            failureRedirect: '/sessions/new',
            failureMessage: 'Invalid Login Credentials'
        }
    )(req, res, next);
}

exports.delete = function (req,res,next) {
    req.logout();
    res.redirect('/');
}