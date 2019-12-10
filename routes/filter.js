var express = require('express');
var ProductFilter = require('../filterjs/filter');

var router = express.Router();

router.get("/:filterID", function (req, res, next) {
    var result = ProductFilter.getProductByFiler(req.params.filterID);
    res.render('pages/products/list', { title: 'Sản phẩm tìm được', products: result });
  });

module.exports = router;
