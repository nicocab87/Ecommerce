class productsService{

    constructor (dao){
        if (!productsService.instance) {
            this.dao = dao;
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