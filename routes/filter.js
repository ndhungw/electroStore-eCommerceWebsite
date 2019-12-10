var express = require('express');
var ProductFilter = require('../filterjs/filter');

var router = express.Router();

var Product = require('../db/models/product');

router.get("/:filterID", function (req, res, next) {
  
  if (req.params.filterID === "below1000")
  {
    Product.find({currentPrice: {$lt: 300}})
    .then(function(product)
    {
      res.render('pages/products/list',{title: 'Kết quả tìm được', products: product});
    })
  }
    
  });

module.exports = router;
