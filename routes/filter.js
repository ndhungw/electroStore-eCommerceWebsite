var express = require('express');
var ProductFilter = require('../controllers/filter');

var router = express.Router();

var Product = require('../models/productModel');

router.get("/:filterID", function (req, res, next) { 
    
    ProductFilter.getProductByFiler(req, res, next)});

module.exports = router;
