const userModel = require("../models/user");
const {cartService} = require("../repositories/index");
const {productService} = require("../repositories/index");
const { generateProduct } = require("../utils/generateMock.utils");


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

    static async changePassword(req, res){
        res.render('changePassword')
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

    static async getUserManager (req, res){
        try {
            const user = await userModel.find({})
            const userWithRoleFlag = user.map(user=>{
                user.isUser= user.role == 'user'
                user.isPremium= user.role == 'premium'
                user.isAdmin= user.role == 'admin'
                return user
            })
            res.render('user-manager',{user:userWithRoleFlag})
        } catch (error) {
            res.status(404).send(error)
        }
    } 

    static async logger(req, res){
        
        req.logger.fatal('Este es un Error fatal')
        req.logger.error('Este es un Error')
        req.logger.warning('Este es una advertencia')
        req.logger.info('Este es info log')
        req.logger.debug('Este es un debug log')

        res.send({status:'success', message: 'Testeo de logger'})
    }

    
}

module.exports = viewControler