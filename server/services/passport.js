var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Admin = require('./../models/admin.js');

  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, function(email, password, done) {
    Admin.findOne({ email: email })
    .exec(function(err, user) {
      if(err) done(err);
      if(!user) return done(null, false);
      if(user.verifyPassword(password)) return done(null, user);
      return done(null, false);
    });
  }));

  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(_id, done) {
    Admin.findById(_id, function(err, user) {
      done(err, user);
    });
  });

  module.exports = passport;
