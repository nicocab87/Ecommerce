const {cartService, productService} = require("../repositories/index");

class cartsController{
    static async create (req, res){
        try {
            const data = await cartService.create()
            res.send({status:`succes`, payload: data})
        } catch (error) {
            res.status(404).send(error)
        }    
    }

    static async get(req, res){
        try {
            const data = await cartService.getAll()
            res.send({status:`succes`, payload: data})
        } catch (error) {
            res.status(404).send(error)
        }    
    }

    static async getById(req, res){
        const idCart = req.params.cid;
        try {
            const data = await cartService.getById(idCart)
            res.send({status:`succes`, payload: data})
        } catch (error) {
            res.status(404).send(error)
        }
    }

    static async addProductToCart(req, res){
        const idCart = req.params.cid;
        const idProduct = req.params.pid;
        try {
            const product = await productService.getById(idProduct)
            if(req.user.rol =='premium' && product.owner == req.user.email){
                throw new Error('No puede agergar productos que le pertenece')
            }
            const data = await cartService.addProduct(idCart, idProduct)
            res.send({status: "succeses", data})
        } catch (error) {
            res.status(404).send(error.message)
        }
    }

    static async changeQuantityOfProduct(req, res){
        const idCart = req.params.cid;
        const idProduct = req.params.pid;
        const cantidad= req.body
        const number = cantidad.quantity

        try {
            const data = await cartService.changeQuantity(idCart, idProduct, number)
            res.send({status: 'succes', data})
        } catch (error) {
            res.status(404).send(error)
        }
    }

    static async delete(req, res){
        const idCart = req.params.cid;
        try {
            const data = await cartService.delete(idCart)
            res.send({status: 'succes', data})
        } catch (error) {
            res.status(404).send(error)
        }    
    }

    static async deleteProduct(req, res){
        const idCart = req.params.cid;
        const idProduct = req.params.pid;
        try {
            const data = await cartService.deleteProduct(idCart,idProduct)
            res.send({status: 'succes', data})
        } catch (error) {
            res.status(404).send(error)
        }    
    }

    static async purchase(req,res){
        const idCart = req.params.cid;
        try {
            const remainderProduct = await cartService.purchase(idCart, req.session.user.email)
            res.send({status:'succes', payload:remainderProduct})
        } catch (error) {
            return res.status(500).send({status:'error', error:error.message})
        }
    }
}

module.exports = cartsController