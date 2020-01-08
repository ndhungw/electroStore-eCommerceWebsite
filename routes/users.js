var express = require('express');
var router = express.Router();

const usersController = require('../controllers/usersController');
const passport = require('passport');
const auth = require('../config/auth');

/* GET login page. */
router.get('/login', auth.checkAlreadyLoggedIn, usersController.displayLoginPage);

/* GET register page. */
router.get('/register', auth.checkAlreadyLoggedIn, usersController.displayResgiterPage);


/* GET logout page. */
router.get('/logout', usersController.displayLogoutPage);

/* POST Login page. */
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
})

router.post('/login', usersController.loginInto);

/* POST Register page. */
// router.post('/register', 
//   passport.authenticate('local-signup', { failureRedirect: '/users/register', failureFlash: true }),
//   function(req, res) {
//     res.redirect('/');
//   });
router.post('/register', usersController.registerNewUser);


// VERIFICATION EMAIL
// localhost:4000/users/email-verification
router.get('/email-verification', usersController.activateUser);

// An verification email has been sent to yourmailaddress. 
// router.get('/requireVerification', (req,res) => {
//   res.render('pages/users/requireVerification')
// })
router.get('/requireVerification', usersController.displayRequireVerification);

module.exports = router;
