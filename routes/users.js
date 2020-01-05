var express = require('express');
var router = express.Router();

var passport = require('../passport/index');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send(req.query.search);
// });

/* GET login page. */
router.get('/login', function (req, res, next) {
  res.render('pages/login', { title: 'Đăng nhập', message: req.flash('error')});
});

/* GET register page. */
router.get('/register', function (req, res, next) {
  res.render('pages/register', { title: 'Đăng kí', message: req.flash('error')});
});


/* GET logout page. */
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

/* POST Login page. */
router.post('/login', 
  passport.authenticate('local-login', {
    failureRedirect: '/users/login', 
    failureFlash: true }),
    function(req, res) {
      res.redirect('/');
    }
);

/* POST Register page. */
router.post('/register', 
  passport.authenticate('local-signup', { failureRedirect: '/users/register', failureFlash: true }),
  function(req, res) {
    res.redirect('/');
  });

module.exports = router;
