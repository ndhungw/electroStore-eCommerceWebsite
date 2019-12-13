var express = require('express');
var ProductFilter = require('../filterjs/filter');

var router = express.Router();

var Product = require('../db/models/product');

router.get("/:filterID", function (req, res, next) { ProductFilter.getProductByFiler(req, res, next)});

module.exports = router;
