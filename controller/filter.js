var express = require('express');
var ProductFilter = {};

// /* GET products listing. */
// router.get('products/list', function(req, res, next) {
//   res.send('ListProduct');
// });

var Product = require('../models/productModel');

ProductFilter.getProductByFiler = function (req, res, next) {
    var condition = [];
    console.log("hello thereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
    if (req.params.filterID === "below1000")
    {
      //condition.push({currentPrice: {$lt: 1000}});
      condition.push({brand: "Samsung"});
        
    }

    condition.push({currentPrice: {$lt: 300}});
    Product.find({$and: condition})
        .then(function(product)
        {
          res.render('pages/products/list',{title: 'Kết quả tìm được', products: product});
        })
};

module.exports = ProductFilter;