//var express = require('express');
var ProductFilter = {};

var Product = require('../models/productModel');

ProductFilter.getProductByFiler = function (req, res, next) {
    var condition = [];
    //console.log("hello thereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
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