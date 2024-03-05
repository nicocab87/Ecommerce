const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    products:{
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref:'products'
                },
                quantity: {
                    type: Number,
                    default:1
                }
            }
        ]
    }
});

const CartModel = mongoose.model('carts', cartSchema);

module.exports = CartModel;