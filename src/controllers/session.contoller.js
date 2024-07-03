const { createHash, isValidPassword } = require("../utils/utils")
const { jwtSecret } = require("../config/config")
const userModel = require("../models/user")
const { mailingService } = require("../repositories")
const jwt = require("jsonwebtoken")
class sessionController{
    static async register(req, res){
        res.send({status: 'success', message: 'user resgistered'})
    }

    static async registerFail(req, res){
        res.status(401).send({status:'error', error: 'authentication error'})
    }

    static async login(req, res){
        try {  
            const user = req.user
            req.session.user = {
                name: `${user.first_name} ${user.last_name}`,
                email: user.email,
                age: user.age,
                rol: user.rol,
                cart: user.cart,
                profilePicture: user.profilePicture,
            }

            res.send({status:'success', payload: req.session.user, message: 'success'})
        } catch (error) {
            console.error('Error en el inicio de sesión:', error);
            res.status(500).send({ status: 'error', error: 'internal server error' });
        }
    }

    static async loginFail(req, res){
        res.status(401).send({status:'error', error: 'login fail'})
    }

    static async logOut(req, res){
        req.session.destroy((err)=>{
            if(err) return res.status(500).send('there was an error')
        })
        res.redirect('/login')    
    }

    static async resetPassword(req, res){
        const {email} = req.body;
        if(!email){return res.status(400).send({status:'error', error: 'Missing data'})}
    
        try {
            const user = await userModel.findOne({email})
            if(!user){
                return res.status(401).send({status:'error', error: 'User not found'})
            }
    
            await mailingService.sendPassResetEmail(email,user)
    
            res.send({status:'succes', message:'Password reset'})
        } catch (error) {
            res.status(500).send({status:'error', error:error.message})
        }
    }

    static async verifyToken(req, res){
        const {passwordResetToken} = req.params
        try {
            jwt.verify(passwordResetToken, jwtSecret, (e)=>{
                if(e){
                    return res.redirect('/resetPassword')
                }
                res.redirect('/changePassword')
            })
            //res.send({payload:'true'})

        } catch (error) {
            res.status(500).send({status:'error', error:error.message})
        }
    }

    static async changePassword(req, res){
        const {email, password} = req.body;
        if(!email || !password){return res.status(400).send({status:'error', error: 'Missing data'})}
    
        try {
            const user = await userModel.findOne({email})
            if(!user){return res.status(401).send({status:'error', error: 'User not found'})}
            if(isValidPassword(user, password)){ return res.status(400).send({status:'Error', error:'No se puede introducir la misma contraseña' })}
            const hashedPassword = createHash(password);
            user.password = hashedPassword
            const userUpdolated = await userModel.updateOne({_id:user._id}, user)

            res.send({status:'success', payload: userUpdolated})
        } catch (error) {
            res.status(500).send({status:'error', error:error.message})
        }
    }

    static async githubCallback (req, res){
        const user = req.user

        req.session.user = {
            name:user.first_name,
            email: user.email,
            age: user.age,
            rol: user.rol,
            id: user._id,
            cart: user.cart
        }
        res.redirect('/');    
    }

    static async current(req, res){
        try {
            if(req.session){
                const user = req.user
                
                req.session.user = {
                    name:user.first_name,
                    email: user.email,
                    age: user.age,
                    rol: user.rol,
                    id: user._id,
                    cart: user.cart,
                    profilePicture: user.profilePicture
                }
                res.send({user: req.session.user})
            }else{
                console.error('No se ha iniciado ninguna sesión')
            }    
        } catch (error) {
            res.status(500).json({ error: 'Error en el servidor' });
        }
    }

}

module.exports = sessionController