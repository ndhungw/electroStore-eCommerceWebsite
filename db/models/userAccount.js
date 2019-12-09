var mongoose = require('mongoose');//import mongoose
var Schema = mongoose.Schema;//use the mongoose schema object

//create a new schema
var userAccountSchema = new Schema({ 
    username: {type: String, required: true},
    password: {type: String, required: true},
}); 

/*export this module so that i can import the functionality 
of this file in other files*/
//export mongoose and model method
// _name of the model: 'Content'
// _the Schema on which this model is based: schema (mongoose.Schema)

userAccountSchema.methods.validPassword = function( pwd ) {
    // EXAMPLE CODE!
    return ( this.password === pwd );
};



module.exports = mongoose.model('userAccount', userAccountSchema,'userAccount');
//Note that mongoose will create the pluralized name of userAccountthe model: ('products')