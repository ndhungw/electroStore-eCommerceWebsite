var ProductFilter = {};

// /* GET products listing. */
// router.get('products/list', function(req, res, next) {
//   res.send('ListProduct');
// });

var Product = require('../db/models/product');

ProductFilter.getProductByFiler = function (clickedID) {
    console.log('hello from filter');
    var result;
    if (clickedID === "below1000")
    {
        Product.find({currentPrice: {$lt: 1000}}, (err, product)=> {
            if (!err) result = product; 
        })
    }
    return result;
};

module.exports = ProductFilter;