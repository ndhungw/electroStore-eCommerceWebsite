var productModel = require('../models/productModel');

const controller = {};

controller.displayCart = async (req, res) => {
    res.render('pages/checkout/cart');
}

controller.displayPaymentPage = (req, res) => {
    // (payment.html)
    // res.render('pages/checkout/payment', { products: cartData });
    res.render('pages/checkout/payment');
}
module.exports = controller;