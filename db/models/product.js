var mongoose = require('mongoose');//import mongoose
var Schema = mongoose.Schema;//use the mongoose schema object

//create a new schema
var productSchema = new Schema({ 
    name: {type: String, required: true},
    brand: {type: String, required: true},
    currentPrice : {type: Number, required: true},
    oldPrice : {type: Number, required: true},
    imgURL: {type: String, required: true},
    imgURL2: {type: String, required: true},
    imgURL3: {type: String, required: true},
}); 

productSchema.statics.getProductByFilter = function(FilterID) {
    if (FilterID === "below1000")
    {
        return this.find({currentPrice: {$lt: 1000}});
    }
    
  };

/*export this module so that i can import the functionality 
of this file in other files*/
//export mongoose and model method
// _name of the model: 'Content'
// _the Schema on which this model is based: schema (mongoose.Schema)
module.exports = mongoose.model('Product', productSchema,'products');
//Note that mongoose will create the pluralized name of the model: ('products')