const cartsService = require("../services/carts.service");
const productsService = require("../services/products.service");

const productService = new productsService()
const cartService = new cartsService()

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
            res.render('carts',{products})
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