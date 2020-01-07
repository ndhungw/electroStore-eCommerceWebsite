var mongoose = require('mongoose');//import mongoose
const bcrypt = require('bcryptjs');

var Schema = mongoose.Schema;//use the mongoose schema object

//create a new schema
var UserSchema = new Schema({ 
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String, 
        required: true
    },
    password: {
        type: String, 
        required: true
    },
    avatarURL: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: 0
    },
    isBlocked: {
        type: Boolean,
        default: 0
    }
}); 

let UserModel = mongoose.model('User', UserSchema, 'users');


/**
 * Get an user with <userID>
 */
// UserModel.getUser = (userID) => {
//     console.log('UserModel.getUser');
//     var query = UserModel.findById(userID);
//     return query;
// }


UserModel.setActiveStatus = async (userID) => {
    var query = await UserModel.findByIdAndUpdate(
        {
            _id: userID
        },
        {
            $set: { isActive: 1 }
        },
        {
            useFindAndModify: false
        }
    )
    return query;
}

// userAccountSchema.methods.validPassword = function( pwd ) {
//     // EXAMPLE CODE!
//     return ( this.password === pwd );
// };



module.exports = UserModel;