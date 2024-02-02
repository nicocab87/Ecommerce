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
        await fs.promises.writeFile(this.path, JSON.stringify(this.mainCart))
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
        console.log(cart)
        console.log(productData)


        if(cart && productData){
            cart[idCart-1].product.push(productData)
            await fs.promises.writeFile(this.path, JSON.stringify(this.mainCart))
            return  cart
        }else{
            console.error(`Algun dato ingresado es incorrecto`);
        }
    }
}

const mainCart = new CartManager (`./Cart.JSON`)


module.exports = mainCart

