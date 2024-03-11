const mongoose = require("mongoose");
const { SassNumber } = require("sass");


const USerSchema = new mongoose.Schema({
    first_name: String ,
    last_name: String ,
    email: String ,
    age: Number,
    password: String,
    isAdmin: {
        type: Boolean,
        default: false
    }
})

const userModel = mongoose.model('user', USerSchema);

module.exports = userModel;