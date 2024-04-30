const CartModel = require("../../models/carts");

//const productsService = require('../../services/products.service');

class CartManager {

    constructor(productsService){
        this.productsService = productsService;
        console.log('new instance of CartManager')
    }

    async addCart(){
        const data = await CartModel.create({})

        return (data ? data : console.error('El carrito no se creó'))
    }

    async getCart() {
        const data = await CartModel.find().populate('products.product')
        return data 
    }

    async getCartsById (id) { 
        const searchCart = await CartModel.findById(id).populate('products.product').lean()
        return (searchCart ? searchCart : console.error('El carrito no existe'))
    }

    async addProductToCart(idCart, idProduct){
        const productData = await this.productsService.getById(idProduct)
        const cartToUpdate = await CartModel.findById(idCart)

        if (cartToUpdate && productData) {
            const existingProduct = cartToUpdate.products.findIndex(item => item.product == idProduct)

            existingProduct !== -1 ? cartToUpdate.products[existingProduct].quantity += 1 : cartToUpdate.products.push({ product: idProduct }); 
            await CartModel.updateOne({_id:idCart}, cartToUpdate)
        }else{
            console.error('Carrito o producto inexistente')
        }
    }

    async deleteProductToCart (idCart, idProduct){
        const productData = await this.productsService.getById(idProduct)
        const cartToUpdate = await CartModel.findById(idCart)

        if (cartToUpdate && productData){
            const existingProduct = cartToUpdate.products.findIndex(item => item.product == idProduct)

            existingProduct !== -1 && cartToUpdate.products.splice(existingProduct, 1)
            await CartModel.updateOne({_id:idCart}, cartToUpdate)
        }else{
            console.error('Carrito o producto inexistente')
        }
    }

    async changeQuantityToProduct (idCart, idProduct, number){
        const productData = await this.productsService.getById(idProduct)
        const cartToUpdate = await CartModel.findById(idCart)
        
        if (cartToUpdate && productData) {
            const existingProduct = cartToUpdate.products.findIndex(item => item.product == idProduct)

            existingProduct !== -1 && (cartToUpdate.products[existingProduct].quantity = number)

            await CartModel.updateOne({_id:idCart}, cartToUpdate)
        }else{
            console.error('Carrito o producto inexistente')
        }
    }

    async deleteCart (idCart){
        try {
            await CartModel.deleteOne({_id:idCart})
        } catch (error) {
            console.error(error)
        }
    }
}

module.exports = CartManager

