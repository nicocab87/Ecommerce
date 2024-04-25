const productService = require("../repositories/index");

class realTimeProductsController{
    static async create(req, res){
        const product = req.body
        try {
            const data = await productService.create(product);
            res.send({status:`succes`, payload: data})
    
        } catch (error) {
            res.status(400).send(error)
        }
    }
}

module.exports = realTimeProductsController