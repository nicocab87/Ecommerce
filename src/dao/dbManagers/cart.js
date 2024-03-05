const CartModel = require("../../models/carts");
const manager = require("./products");

class CartManager {

    constructor(){
        console.log('new instance of CartManager')
    }

    async addCart(){
        let newcart = await CartModel.create({})
        console.log('carrito nuevo')
        return newcart
    }

    async getCartsById (id) { 
        const searchCart = await CartModel.findById(id).populate('products.product')
        console.log(JSON.stringify(searchCart, null, "\t"))
        
        return (searchCart ? searchCart : console.error('El carrito no existe'))
    }

    async addProductToCart(idCart, idProduct){
        const productData = await manager.getProductById(idProduct)
        const cartToUpdate = await CartModel.findById(idCart)

        if (cartToUpdate && productData) {
            const existingProduct = cartToUpdate.products.findIndex(item => item.product == idProduct)

            existingProduct !== -1 ? cartToUpdate.products[existingProduct].quantity += 1 : cartToUpdate.products.push({ product: idProduct }); 
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

