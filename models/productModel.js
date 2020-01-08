var mongoose = require('mongoose');//import mongoose
var Schema = mongoose.Schema;//use the mongoose schema object

//create a new schema
var productSchema = new Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    currentPrice: { type: Number, required: true },
    oldPrice: { type: Number, required: true },
    imgURL: { type: String, required: true },
    imgURL2: { type: String, required: true },
    imgURL3: { type: String, required: true },
});

let ProductsModel = mongoose.model('Product', productSchema, 'products');

productSchema.statics.getProductByFilter = function (FilterID) {
    if (FilterID === "below1000") {
        return this.find({ currentPrice: { $lt: 1000 } });
    }

};

//hàm tự phân trang
ProductsModel.paginatedResults = () => {
    return async (req, res, next) => {
        //kiểm tra điều kiện
        if (req.query.page < 1) {
            req.query.page = 1;
        }
        if (req.query.limit < 5) {
            req.query.limit = 5;
        }

        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const PaginatedResult = {};//lưu kết quả

        // Tổng số trang
        PaginatedResult.totalPage = parseInt(await ProductsModel.countDocuments()) / limit;
        //console.log("PaginatedResult.totalPage = " + PaginatedResult.totalPage)

        PaginatedResult.current = {
            page: page,
            limit: limit,
        }

        if (endIndex < await ProductsModel.countDocuments().exec()) {
            PaginatedResult.next = {
                page: page + 1,
                limit: limit,
            };
        }

        if (startIndex > 0) {
            PaginatedResult.previous = {
                page: page - 1,
                limit: limit,
            };
        }

        try {
            PaginatedResult.products = await ProductsModel.find().limit(limit).skip(startIndex).exec();
            res.paginatedResults = PaginatedResult;
            next();
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    }
}

// GET All products
ProductsModel.getAll = () => {
    console.log('ProductsModel.getAll');
    var query = ProductsModel.find({});
    return query;
}

/**
 * Get an productID with <productID>
 */
ProductsModel.getProduct = (productID) => {
    console.log('ProductsModel.getProduct');
    var query = ProductsModel.findById(productID);
    return query;
}

ProductsModel.getProductByBrand = (brand) => {
    console.log('ProductsModel.getProductByBrand');
    var query = ProductsModel.find({brand: brand});
    return query;
}

/*export this module so that i can import the functionality 
of this file in other files*/
//export mongoose and model method
// _name of the model: 'Content'
// _the Schema on which this model is based: schema (mongoose.Schema)
module.exports = ProductsModel;
//Note that mongoose will create the pluralized name of the model: ('products')