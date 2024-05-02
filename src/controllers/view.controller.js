const {cartService} = require("../repositories/index");
const {productService} = require("../repositories/index");
const { generateProduct } = require("../utils");


class viewControler{
    static async goHome (req, res){
        try {
            res.render('home', {} )
        } catch (error) {
            res.status(440).send(error)
        }
    }

    static async goRealTimeProducts (req, res) {

        const data = await productService.getAll();
        try {
            res.render('realTimeProducts', {data} )
        } catch (error) {
            res.status(440).send(error)
        }
    }

    static async goChat (req, res){
        try {
            res.render('chat', {})
        } catch (error) {
            res.status(440).send(error)
        }
    }

    static async goCart (req, res) {
        const cartId = req.params.cid
        try { 
            const dataToRender = await cartService.getById(cartId)
            const {products} = dataToRender
            let data =[]
            products.forEach(e => {
                const total = e.product.price*e.quantity
                e={...e, total:total}
                data.push(e)
            });
            
            res.render('carts',{data})
        } catch (error) {
            res.status(404).send(error)
        }
    }

    static async goRegister (req, res){
        res.render('register', {})
    }

    static async goLogin (req, res) {
        res.render('login', {})
    }

    static async goProfile (req, res){
        res.render('profile', {user: req.session.user})
    }

    static async goResetPassword (req, res){
        res.render('resetPassword', {})
    }

    static async getMocking(req,res){
        try {
            const data = generateProduct(100)
            res.send({status:'success', payload: data})
        } catch (error) {
            res.status(404).send(error)
        }
    }

    static async goGetProductById (req, res){
        const productId = req.params.pid

        try {
        const dataToRender = await productService.getById(productId)
        res.render('home',{dataToRender})
        } catch (error) {
            res.status(404).send(error)
        }
    }

    
}

module.exports = viewControler