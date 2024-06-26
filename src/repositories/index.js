const CartManager = require("../dao/dbManagers/cart");
const ProductManager = require("../dao/dbManagers/products");
const TicketManager = require("../dao/dbManagers/ticket");
const cartsService = require("../services/carts.service");
const MailingService = require("../services/mailing.service");
const ProductsService = require("../services/products.service");
const TicketService = require("../services/ticket.service");

const productService = new ProductsService(new ProductManager())
const ticketService = new TicketService(new TicketManager())
const cartService = new cartsService(new CartManager(productService),productService,ticketService)
const mailingService = new MailingService()

module.exports={
    productService,
    cartService,
    ticketService,
    mailingService
}