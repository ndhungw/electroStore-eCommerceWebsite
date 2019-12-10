var express = require('express');

var router = express.Router();

var passport = require('../passport/index');

router.post('/login', 
  passport.authenticate('local-login', { successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true })
);

router.post('/register', 
  passport.authenticate('local-signup', { failureRedirect: '/register' }),
  function(req, res) {
    res.redirect('/');
  });

module.exports = router;
