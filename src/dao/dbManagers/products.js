const ProductModel = require("../../models/product")
class ProductManager {

    constructor(){
        console.log('new intance of dbd manager')
    }
    
    async addProduct(product){
        let newProduct = await ProductModel.create(product)
        return newProduct
    }

    async getProducts () { 
        let productData = await ProductModel.find().lean()
        return productData;
    }

    async getPaginate (page, limit, opt, sort) {
        let result = await ProductModel.paginate(opt, {limit, page, sort, lean: true})
        return result
    }

    async getProductById(id){
        let productData = await ProductModel.findById(id)
        return productData;
    }

    async updateProduct(id, change){
        const data = await ProductModel.findByIdAndUpdate({_id:id}, change, { new: true })
        return data
    }

    async deleteProduct (id){
        const data = await ProductModel.deleteOne({ _id: id });
    }

}

module.exports = ProductManager