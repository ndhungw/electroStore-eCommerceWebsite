var express = require('express');

var router = express.Router();

var bodyParser = require('body-parser');
const auth = require('../config/auth');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var Product = require('../models/productModel');

/* GET home page. */
// router.get('/', function (req, res, next) {
//   Product.find().exec((function (err, product) {
//     console.log("get user " + req.user);
//     res.render('index', { title: 'Trang chủ', products: product });
//   }));
// })

/* GET home page. */
router.get('/', auth.ensureAuthenticated, function(req, res, next) {
  res.render('pages/index', { 
    title: 'Trang chủ',
    user: req.user
  });
});

/* GET home page. */
router.get('/index.html', auth.ensureAuthenticated, function(req, res, next) {
  res.render('pages/index', { 
    title: 'Trang chủ'
  }
    );
});

// /* GET about page. */
// router.get('/about.html', function(req, res, next) {
//   res.render('pages/about', { title: 'Về chúng tôi' });
// });

// /* GET contact page. */
// router.get('/contact.html', function(req, res, next) {
//   res.render('pages/contact', { title: 'Liên hệ' });
// });

// /* POST contact page. */
// router.post('/contact.html', function(req, res, next) {
//   res.render('pages/contact', { title: 'Liên hệ' });
// });

// /* GET faqs page. */
// router.get('/faqs.html', function(req, res, next) {
//   res.render('pages/faqs', { title: 'Câu hỏi thường gặp' });
// });

// /* POST faqs page. */
// router.post('/faqs.html', function(req, res, next) {
//   res.render('pages/faqs', { title: 'Câu hỏi thường gặp' });
// });

// /* GET help page. */
// router.get('/help.html', function(req, res, next) {
//   res.render('pages/help', { title: 'Trợ giúp' });
// });

// /* GET privacy page. */
// router.get('/privacy.html', function(req, res, next) {
//   res.render('pages/privacy', { title: 'Chính sách bảo mật' });
// });

// /* GET product page. */
// router.get('/product.html', function(req, res, next) {
//   res.render('pages/product', { title: 'Sản phẩm' });
// });

// /* GET product2 page. */
// router.get('/product2.html', function(req, res, next) {
//   res.render('pages/product', { title: 'Sản phẩm' });
// });

// /* GET single page. */
// router.get('/single.html', function(req, res, next) {
//   res.render('pages/single', { title: 'Chi tiết sản phẩm'});
// });

// /* GET single2 page. */
// router.get('/single2.html', function(req, res, next) {
//   res.render('pages/single2', { title: 'Chi tiết sản phẩm' });
// });

// /* GET terms page. */
// router.get('/terms.html', function(req, res, next) {
//   res.render('pages/terms', { title: 'Điều khoản' });
// });

module.exports = router;
