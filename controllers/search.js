var express = require('express');
var ProductSearch = {};

// /* GET products listing. */
// router.get('products/list', function(req, res, next) {
//   res.send('ListProduct');
// });

var Product = require('../models/productModel');

ProductSearch.GetProductList = function (req, res, next) {
    
    var condition = [];
    condition.push({});
//?brand=
    //get brand from query string
    if (req.query.brand != "All")
    {
        var chosenBrand = req.query.brand;
        condition.push({brand: chosenBrand});
    }

    //get price range from query string
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
            case "above500":
                {
                    condition.push({ currentPrice: { $gte: 200 } });  
                    break;
                }
            default:
        }

        //condtion = [ {}, {brand: "Samsung"}, {currentPrice: {$lt: 100} }]

    }

    //get order option from query string
    var sort = req.query.sort;
    var order = req.query.by;
    //0
    //1
    //-1
    var sortOption;

    if (sort && order)
    {
        if (sort === "1")
        {
            //{name: 1} tìm kiếm tăng dần
            //{name: -1} tìm kiếm giảm dần

            sortOption = {name: parseInt(order)};
        }
        else
        {
            console.log(parseInt(order));
            sortOption ={currentPrice: parseInt(order)};
        }
    }

    Product.find({$and: condition}).sort(sortOption)
            .then(function(product)
            {
                console.log("found you");
              res.render('pages/products/list',{title: 'Kết quả tìm được', products: product});
            })
    
};

module.exports = ProductSearch;