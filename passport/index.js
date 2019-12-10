var express = require('express');

var bodyParser = require('body-parser');
//var urlencodedParser = bodyParser.urlencoded({ extended: false });
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

  

passport.use('local-login',new LocalStrategy(
  function(username, password, done) {
    UserAccount.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

passport.use('local-signup',new LocalStrategy(
  function(username, password, done) {
    if (password.length < 7)
    {
      return done(null, false);
    }
    UserAccount.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (user) { //already a username
        return done(null, false);
      }
      var newUser = new UserAccount();
      newUser.username = username;
      newUser.password = password;

      // save the user
      newUser.save(function(err) {
        if (err)
            throw err;
        return done(null, newUser);
    });
    });
  }
));

module.exports = passport;