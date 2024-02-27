const mongoose = require ('mongoose');

const productSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }, 
        price: {
            type: Number,
            required: true
        }, 
        code: {
            type: String,
            required: true,
            unique: true
        },   
        stock: {
            type: Number,
            required: true
        },
        status: {
            type: Boolean,
            default: true
        }
})

const ProductModel = mongoose.model('products', productSchema);

module.exports = ProductModel;
