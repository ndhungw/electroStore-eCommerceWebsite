var express = require('express');
var router = express.Router();

var ProductSearch = require('../controller/search');
var productModel = require('../models/productModel');

var Product = require('../models/productModel');

/*GET search result*/
router.get('/search/', function (req, res, next) { 
    
  ProductSearch.GetProductList(req, res, next)});

/* GET products listing. */
/*xài middleware để lấy kết quả currentPage, prevPage, nextPage, làm pagination thủ công không dùng AJAX*/
router.get('/', productModel.paginatedResults(), (req, res, next) => {
  //test by json
  //res.json(res.paginatedResults);
  res.render('pages/products/list',{
    title: 'Tất cả sản phẩm',
    paginatedResult: res.paginatedResults,
    products: res.paginatedResults.products,
    previousPage: res.paginatedResults.previous,
    currentPage: res.paginatedResults.current,
    nextPage: res.paginatedResults.next,
    totalPage: res.paginatedResults.totalPage,
  })
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
