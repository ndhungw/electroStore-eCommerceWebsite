var ProductFilter = {};

// /* GET products listing. */
// router.get('products/list', function(req, res, next) {
//   res.send('ListProduct');
// });

var Product = require('../db/models/product');

ProductFilter.getProductByFiler = function (clickedID) {
    
    var result;
    if (clickedID === "below1000")
    {
        result = Product.find({currentPrice: {$lt: 1000}});
        console.log(result);
    }
    return result;
};

module.exports = ProductFilter;