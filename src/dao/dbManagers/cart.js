
const CartModel = require("../../models/carts");
const manager = require("./products");

class CartManager {

    constructor(){
        console.log('new instance of CartManager')
    }

    async addCart(){
        let newcart = await CartModel.create([{}])
        console.log('carrito nuevo')
        return newcart
    }

    async getCartsById (id) { 
        const searchCart = await CartModel.findById(id)
        console.log(searchCart)
        
        return (searchCart ? searchCart : console.error('El carrito no existe'))
    }

    async addProductToCart(idCart, idProduct){
        const productData = await manager.getProductById(idProduct)
        const cartToUpdate = await CartModel.findById(idCart)

        if (cartToUpdate && productData) {
            const existingProduct = cartToUpdate.product.findIndex(item => item.id === idProduct)

            existingProduct !== -1 ? cartToUpdate.product[existingProduct].quantity += 1 : cartToUpdate.product.push({id: idProduct, quantity: 1 });
            
            await CartModel.updateOne({_id:idCart}, cartToUpdate)

        }else{
            console.error('Carrito o producto inexistente')
        }
    }
}

module.exports = CartManager

