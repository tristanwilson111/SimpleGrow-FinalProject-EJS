const mongoose = require( 'mongoose' );
const passport = require('passport');
const plm = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema();

UserSchema.plugin(plm);

module.exports = mongoose.model( 'User', UserSchema );