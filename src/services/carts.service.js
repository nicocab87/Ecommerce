class cartsService{
    constructor(dao, productService, ticketService){
        if (!cartsService.instance) {
            this.dao = dao;
            this.productService = productService
            this.ticketService = ticketService
            cartsService.instance = this;
        }
        return cartsService.instance;
    }

    create(){
        return this.dao.addCart()
    }

    getAll(){
        return this.dao.getCart()
    }

    getById(id){
        return this.dao.getCartsById(id)
    }

    addProduct(idCart, idProduct){
        try {
            const data = this.dao.addProductToCart(idCart, idProduct)
            return data
        } catch (error) {
            console.error(error)
        }
    }

    deleteProduct(idCart, idProduct){
        return this.dao.deleteProductToCart(idCart, idProduct)
    }

    changeQuantity(idCart, idProduct, number){
        return this.dao.changeQuantityToProduct(idCart, idProduct, number)
    }

    delete(idCart){
        return this.dao.deleteCart(idCart)
    }

    async purchase(cartId,userEmail){
        try {
            const cart = await this.getById(cartId)

            const notPurchaseIds = []
            let totalAmount = 0
            for(let i=0; i < cart.products.length; i++ ){
                const item = cart.products[i];
                const remaider = item.product.stock - item.quantity;
                if(remaider>=0){
                    const productupdated = await this.productService.update(item.product._id, {...item.product, stock: remaider})
                    console.log(productupdated,'el producto se acutualiza?')
                    await this.deleteProduct(cartId, item.product._id.toString())
                    totalAmount+=item.quantity*item.product.price
                }else{
                    notPurchaseIds.push(item.product._id)
                }
            }

            if(totalAmount>0){
                await this.ticketService.generate(userEmail, totalAmount)
            }

            return notPurchaseIds
        } catch (error) {
            console.error(error)
        }
        
    }
}

module.exports = cartsService