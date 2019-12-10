// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// module.exports = router;


var express = require('express');

var router = express.Router();

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
// /* GET products listing. */
// router.get('products/list', function(req, res, next) {
//   res.send('ListProduct');
// });

var express = require('express');
var router = express.Router();
var Product = require('../db/models/product');


/* GET login page. */
router.get('/login', function (req, res, next) {
  
  res.render('pages/login', { title: 'Đăng nhập', message: req.flash('error')});
});

/* GET logout page. */
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

/* GET register page. */
router.get('/register', function (req, res, next) {
  res.render('pages/register', { title: 'Đăng kí'});
});

/* GET home page. */
router.get('/', function (req, res, next) {
  Product.find().exec((function (err, product) {
    console.log("get user " + req.user);
    res.render('index', { title: 'Trang chủ', products: product, user: req.user });
  }));

})
/* POST home page. */
router.post('/', function(req, res, next) {
  res.render('index', { title: 'Trang chủ', user: req.user});
});

/* GET index.html page. */
router.get('/index.html', function(req, res, next) {
  res.render('index', { title: 'Trang chủ', user: req.user });
});
/* POST index.html page. */
router.post('/index.html', function(req, res, next) {
  res.render('index', { title: 'Trang chủ', user: req.user });
});


/* GET about page. */
router.get('/about.html', function(req, res, next) {
  res.render('pages/about', { title: 'Về chúng tôi', user: req.user });
});

/* GET checkout page. */
router.get('/checkout.html', function(req, res, next) {
  res.render('pages/checkout', { title: 'Kiểm tra giỏ hàng', user: req.user });
});
/* POST checkout page. */
router.post('/checkout.html', function(req, res, next) {
  res.render('pages/checkout', { title: 'Kiểm tra giỏ hàng', user: req.user });
});

/* GET contact page. */
router.get('/contact.html', function(req, res, next) {
  res.render('pages/contact', { title: 'Liên hệ', user: req.user });
});

/* POST contact page. */
router.post('/contact.html', function(req, res, next) {
  res.render('pages/contact', { title: 'Liên hệ', user: req.user });
});

/* GET faqs page. */
router.get('/faqs.html', function(req, res, next) {
  res.render('pages/faqs', { title: 'Câu hỏi thường gặp', user: req.user });
});

/* POST faqs page. */
router.post('/faqs.html', function(req, res, next) {
  res.render('pages/faqs', { title: 'Câu hỏi thường gặp', user: req.user });
});

/* GET help page. */
router.get('/help.html', function(req, res, next) {
  res.render('pages/help', { title: 'Trợ giúp', user: req.user });
});

/* GET payment page. */
router.get('/payment.html', function(req, res, next) {
  res.render('pages/payment', { title: 'Thanh toán', user: req.user });
});

/* POST payment page. */
router.post('/payment.html', function(req, res, next) {
  res.render('pages/payment', { title: 'Thanh toán', user: req.user });
});

/* GET privacy page. */
router.get('/privacy.html', function(req, res, next) {
  res.render('pages/privacy', { title: 'Riêng tư', user: req.user });
});

/* GET product page. */
router.get('/product.html', function(req, res, next) {
  res.render('pages/product', { title: 'Sản phẩm', user: req.user });
});

/* GET product2 page. */
router.get('/product2.html', function(req, res, next) {
  res.render('pages/product', { title: 'Sản phẩm', user: req.user });
});

/* GET single page. */
router.get('/single.html', function(req, res, next) {
  res.render('pages/single', { title: 'Chi tiết sản phẩm'});
});

/* GET single2 page. */
router.get('/single2.html', function(req, res, next) {
  res.render('pages/single2', { title: 'Chi tiết sản phẩm', user: req.user });
});

/* GET terms page. */
router.get('/terms.html', function(req, res, next) {
  res.render('pages/terms', { title: 'Điều khoản', user: req.user });
});

module.exports = router;
