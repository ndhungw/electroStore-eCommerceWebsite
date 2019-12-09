var express = require('express');

var router = express.Router();

var passport = require('../passport/index');

router.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');;
  });

module.exports = router;
