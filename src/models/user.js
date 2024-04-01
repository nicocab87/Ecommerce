const mongoose = require("mongoose");
const { SassNumber } = require("sass");


const USerSchema = new mongoose.Schema({
    first_name: String ,
    last_name: String ,
    email: {
        type: String,
        unique: true
    } ,
    age: Number,
    password: String,
    cart:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'carts'
    },
    rol: {
        type: String,
        default: 'user'
    }
})

const userModel = mongoose.model('user', USerSchema);

module.exports = userModel;