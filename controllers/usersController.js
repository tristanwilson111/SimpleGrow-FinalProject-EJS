const User = require('../models/user');
const passport = require('passport');

exports.new = function(req,res,next) {
    locals = {
        title: 'User Registration',
        messages: req.session.messages || []
    }
    req.session.messages = [];
    res.render('users/new', locals);
}

exports.create = function(req,res,next) {
    req.session.messages = []

    User.register(new User({
        username: req.body.username
    }), req.body.password)
    .then(function(user){
        req.login(user, function(){
            req.session.messages.push('You were successfully registered.')
            
            res.redirect('/strains')
        });
    })
    .catch( function(err){
        req.session.messages.push('Issue occured while registering your account.');
        res.redirect('/users/new')
    })
}