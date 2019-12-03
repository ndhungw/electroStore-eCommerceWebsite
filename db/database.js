let mongoose = require('mongoose');

//compass
// const mongodb_url = 'mongodb://localhost:27017/electroStoreDB'

//cloud atlas
const mongodb_url = 'mongodb+srv://ndh1379:123456.@cluster0-dqfsn.gcp.mongodb.net/electroStoreDB?retryWrites=true&w=majority'

class Database {
    constructor() {
        this._connect()
    }

    _connect() {
        mongoose.connect(mongodb_url, {useNewUrlParser: true})
            .then(() => {
                console.log("Database connection successfully!");
            })
            .catch(err => {
                console.log("Database connection error!");
            })
    }
}

module.exports = new Database();