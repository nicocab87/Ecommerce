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

    async getProductById(id){
    
    }

    updateProduct(id, propietyToChange, value){

    }

    async deleteProduct (id){

    }

}



module.exports = ProductManager