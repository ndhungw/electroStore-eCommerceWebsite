var express = require('express');
var router = express.Router();

// /* GET products listing. */
// router.get('products/list', function(req, res, next) {
//   res.send('ListProduct');
// });

var Product = require('../db/models/product');

/* GET products listing. */
router.get('/', function (req, res, next) {
  Product.find().exec(function (err, product) {
    res.render('pages/products/list', { title: 'Tất cả sản phẩm', products: product });
  });
});

/* GET product-of-the-brand listing. */
router.get('/:brand', function(req,res,next){
  Product.find({brand: req.params.brand})
  .then(function(product){
    Product.count({brand: req.params.brand})
    .then(function(count){
      res.render('pages/products/brand-list',{title: 'Sản phẩm thương hiệu', brandProducts: product, brand: req.params.brand, count: count});
    })
  })
});

/* GET product details. */
router.get('/:brand/:id', function (req, res, next) {
  Product.findById(req.params.id)
  .then(function(product){
    res.render('pages/products/details', {foundProduct: product});
  })
});





module.exports = router;
