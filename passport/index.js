// var express = require('express');

// var bodyParser = require('body-parser');

// //var urlencodedParser = bodyParser.urlencoded({ extended: false });
// // /* GET products listing. */
// // router.get('products/list', function(req, res, next) {
// //   res.send('ListProduct');
// // });

// var UserAccount = require('../models/userModel');



// var passport = require('passport')
//   , LocalStrategy = require('passport-local').Strategy;

//   passport.serializeUser(function(user, done) {
//     console.log("serializeUser " + user);
//     done(null, user.id);
//   });
  
//   passport.deserializeUser((id, done) => {
    
//     console.log("deserializing " + id);
//     UserAccount.findById(id, (err, user)=>  {
//       console.log("user " + user);
//       done(err, user);
//     });
//   });

  

// passport.use('local-login',new LocalStrategy(
//   function(username, password, done) {
//     UserAccount.findOne({ username: username }, function(err, user) {
//       if (err) { return done(err); }
//       if (!user) {
//         return done(null, false, { message: 'Incorrect username.' });
//       }
//       if (!user.validPassword(password)) {
//         return done(null, false, { message: 'Incorrect password.' });
//       }

//       return done(null, user);
//     });
//   }
// ));

// passport.use('local-signup',new LocalStrategy(
//   function(username, password, done) {
//     if (password.length < 6)
//     {
//       return done(null, false, { message: 'Password must atleast 6 characters long' });
//     }
//     UserAccount.findOne({ username: username }, function(err, user) {
//       if (err) { return done(err); }
//       if (user) { //already a username
//         return done(null, false, { message: 'Username already taken' });
//       }
//       var newUser = new UserAccount();
//       newUser.username = username;
//       newUser.password = password;

//       // save the user
//       newUser.save(function(err) {
//         if (err)
//             throw err;
//         return done(null, newUser);
//     });
//     });
//   }
// ));

// passport.ensureAuthenticated = function(req,res,next) {
//       if (req.isAuthenticated()){
//           return next();
//       }

//       req.flash('error_msg', 'Please log in to view this resource');
//       res.redirect('/login');
//     }

// passport.checkAlreadyLoggedIn =  function(req,res,next) {
//   if (!req.user) {
//     return next();
//   } else {
// // If the user object exists, the user is logged in and if they try to log in we redirect them to the home page
//     return res.redirect('/');
//   }
// }

// module.exports = passport;