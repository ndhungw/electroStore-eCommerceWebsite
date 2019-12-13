var express = require('express');
var ProductFilter = {};

// /* GET products listing. */
// router.get('products/list', function(req, res, next) {
//   res.send('ListProduct');
// });

var Product = require('../db/models/product');

ProductFilter.getProductByFiler = function (req, res, next) {
    
    var result;
    if (req.params.filterID === "below1000")
    {
        Product.find({currentPrice: {$lt: 300}})
        .then(function(product)
        {
          res.render('pages/products/list',{title: 'Kết quả tìm được', products: product});
        })
    }
};

module.exports = ProductFilter;