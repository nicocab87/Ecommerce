const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: String,
    quantity: Number
});

const cartSchema = new mongoose.Schema({
    product: [productSchema]
});

const CartModel = mongoose.model('carts', cartSchema);

module.exports = CartModel;