const mongoose = require("mongoose");


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
    },
    documents: {
        type: [{
            name: String,
            reference: String
        }],
        default: []
    },
    last_conneection: {
        type: Date,
        default: null
    },
    profilePicture: {
        type: String,
        default: null
    }
})

const userModel = mongoose.model('user', USerSchema);

module.exports = userModel;