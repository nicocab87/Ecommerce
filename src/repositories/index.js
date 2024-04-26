const CartManager = require("../dao/dbManagers/cart");
const ProductManager = require("../dao/dbManagers/products");
const cartsService = require("../services/carts.service");
const productsService = require("../services/products.service");

const productService = new productsService(new ProductManager())
const cartService = new cartsService(new CartManager(productService))

module.exports={
    productService,
    cartService
}