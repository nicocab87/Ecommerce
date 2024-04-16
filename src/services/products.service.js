const ProductManager = require("../dao/dbManagers/products")

class productsService{

    constructor (){
        if (!productsService.instance) {
            this.dao = new ProductManager();
            productsService.instance = this;
        }
        return productsService.instance;
    }

    create(product){
        return this.dao.addProduct(product)
    }

    getAll(){
        return this.dao.getProducts()
    }

    paginate(page, limit, opt, sort){
        return this.dao.getPaginate(page, limit, opt, sort)
    }

    getById(id){
        return this.dao.getProductById(id)
    }
    
    update(id, change){
        return this.dao.updateProduct(id, change)
    }

    delete(id){
        return this.dao.deleteProduct(id)
    }
    
}

module.exports = productsService