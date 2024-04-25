class cartsService{
    constructor(dao){
        if (!cartsService.instance) {
            this.dao = dao;
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
        return this.dao.addProductToCart(idCart, idProduct)
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
}

module.exports = cartsService