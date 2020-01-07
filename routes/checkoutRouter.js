var express = require('express');
var router = express.Router();

const auth = require('../config/auth');

const checkoutController = require('../controllers/checkout');
// localhost:PORT/checkout

/* GET Method */
// GET cart page
router.get('/cart', auth.ensureAuthenticated, checkoutController.displayCart);

// GET shipping page
router.get('/shipping', ()=> {});

// GET payment page
router.get('/payment',  auth.ensureAuthenticated, checkoutController.displayPaymentPage);


/* POST  Method */
// POST cart page
router.post('/cart', ()=> {});

// POST add-to-cart page
router.post('/add-to-cart', ()=> {});

// POST payment page
router.post('/payment', ()=> {});




module.exports = router;