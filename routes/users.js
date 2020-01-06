var express = require('express');
var router = express.Router();

const usersController = require('../controllers/usersController');
const passport = require('passport');
const auth = require('../config/auth');

/* GET login page. */
router.get('/login', auth.checkAlreadyLoggedIn, function (req, res, next) {
  res.render('pages/users/login', { title: 'Đăng nhập', message: req.flash('error')});
});

/* GET register page. */
router.get('/register', auth.checkAlreadyLoggedIn,  function (req, res, next) {
  res.render('pages/users/register', { title: 'Đăng kí', message: req.flash('error')});
});


/* GET logout page. */
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
})

/* POST Login page. */
// router.post('/login', 
//   passport.authenticate('local-login', {
//     failureRedirect: '/users/login', 
//     failureFlash: true }),
//     function(req, res) {
//       res.redirect('/');
//     }
// );
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
})

/* POST Register page. */
// router.post('/register', 
//   passport.authenticate('local-signup', { failureRedirect: '/users/register', failureFlash: true }),
//   function(req, res) {
//     res.redirect('/');
//   });
router.post('/register', usersController.registerNewUser);


// VERIFICATION EMAIL
router.get('/email-verification', usersController.activateUser);

router.get('/requireVerification', (req,res) => {
  res.render('pages/users/requireVerification')
})
module.exports = router;
