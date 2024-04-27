const CartManager = require("../dao/dbManagers/cart");
const ProductManager = require("../dao/dbManagers/products");
const TicketManager = require("../dao/dbManagers/ticket");
const cartsService = require("../services/carts.service");
const productsService = require("../services/products.service");
const TicketService = require("../services/ticket.service");

const productService = new productsService(new ProductManager())
const ticketService = new TicketService(new TicketManager())
const cartService = new cartsService(new CartManager(productService),productService,ticketService)

module.exports={
    productService,
    cartService,
    ticketService
}