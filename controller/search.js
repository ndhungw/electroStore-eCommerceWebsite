var express = require('express');
var ProductSearch = {};

// /* GET products listing. */
// router.get('products/list', function(req, res, next) {
//   res.send('ListProduct');
// });

var Product = require('../db/models/product');

ProductSearch.GetProduct = function (req, res, next) {
    
    var condition = [];
    condition.push({});
    //console.log("hello thereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
    if (req.query.brand != "All")
    {
       // console.log("hello thereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
        var chosenBrand = req.query.brand;
        condition.push({brand: chosenBrand});
    }

    if (req.query.price != "All")
    {
        var chosenPrice = req.query.price;

        switch(chosenPrice) {
            case "below100":
                {
                    condition.push({currentPrice: {$lt: 100}});   
                    break;
                }
                
            case "200":
                {
                    condition.push({$and: [ { currentPrice: { $lt: 200 } }, { currentPrice: { $gte: 100 } } ]});  
                    break;
                }
            
            case "500":
                {
                    condition.push({$and: [ { currentPrice: { $lt: 500 } }, { currentPrice: { $gte: 200 } } ]});  
                    break;
                }
            case "500":
                {
                    condition.push({ currentPrice: { $gte: 200 } });  
                    break;
                }
            default:
        }

    }

    Product.find({$and: condition})
        .then(function(product)
        {
          res.render('pages/products/list',{title: 'Kết quả tìm được', products: product});
        })
};

module.exports = ProductSearch;