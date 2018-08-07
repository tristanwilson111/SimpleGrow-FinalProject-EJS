const mongoose = require( 'mongoose' );
const passport = require('passport');
const plm = require('passport-local-mongoose');

//Our User Schema
const UserSchema = new mongoose.Schema();

//Default plm creates Username and Password
UserSchema.plugin(plm);

//Makes this class public
module.exports = mongoose.model( 'User', UserSchema );