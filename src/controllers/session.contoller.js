const UserDTO = require("../DTOs/userDTO")
const userModel = require("../models/user")

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
                cart:user.cart
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
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).send({status:'error', error: 'Missing data'})
        }
    
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(401).send({status:'error', error: 'User not found'})
        }
    
        const hashedPassword = createHash(password);
        const result = await userModel.updateOne({_id:user.id}, {$set:{password: hashedPassword}})
        res.send({status:'succes', message:'Password reset', details: result})
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
        if(req.session){
            //const userDTO = new UserDTO(req.session.user)
            res.send({user: req.session.user})
        }else{
            console.error('No se ha iniciado ninguna sesión')
        }    
    }

}

module.exports = sessionController