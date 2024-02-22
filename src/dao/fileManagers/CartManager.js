const fs = require ('fs');
const nuevoProducto = require('./ProductManager');

class CartManager {
    id=1;

    constructor(path){
        this.mainCart = [];
        this.path = path;
        this.iniciarPath()
    }

    async iniciarPath(){
            try {
                await fs.access(this.path);
            } catch (error) {
                await fs.writeFile(this.path, JSON.stringify(this.mainCart), ()=>{});
            }
        }

    async addCart(){
        const cart = {}
        cart.id = this.id++
        cart.product = []

    this.mainCart.push(cart)

        await fs.promises.writeFile(this.path, JSON.stringify(this.mainCart))
        return
    }

    async getCartsById (id) { 
        const cartData = await fs.promises.readFile(this.path, 'utf-8')
        const cart = JSON.parse(cartData)

        const searchCart = cart.find ((cart) => id === cart.id)
        
        return (searchCart ? searchCart : console.error('El producto no existe'))
    }

    async addProductToCart(idCart, idProduct){
        const productData = await nuevoProducto.getProductById(idProduct)
        const cartData = await fs.promises.readFile(this.path, 'utf-8')
        const cart = JSON.parse(cartData)
        const cartToUpdate = cart.find(cartItem => cartItem.id === idCart);

        if (cartToUpdate && productData) {

            const existingProduct = cartToUpdate.product.find(product => product.id === idProduct);
    
            existingProduct ? existingProduct.quantity += 1 : cartToUpdate.product.push({ id: idProduct, quantity: 1 });
            
            await fs.promises.writeFile(this.path, JSON.stringify(cart));
            
            return cart;
        }

    }
}

const mainCart = new CartManager (`./Cart.JSON`)


module.exports = mainCart

