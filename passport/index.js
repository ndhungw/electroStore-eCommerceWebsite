var express = require('express');

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
// /* GET products listing. */
// router.get('products/list', function(req, res, next) {
//   res.send('ListProduct');
// });

var UserAccount = require('../db/models/userAccount');



var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

  passport.serializeUser(function(user, done) {
    console.log("serializeUser " + user);
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => {
    
    console.log("deserializing " + id);
    UserAccount.findById(id, (err, user)=>  {
      console.log("user " + user);
      done(err, user);
    });
  });

  

passport.use(new LocalStrategy(
  function(username, password, done) {
    UserAccount.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false);
      }
      if (!user.validPassword(password)) {
        return done(null, false);
      }
      return done(null, user);
    });
  }
));

module.exports = passport;