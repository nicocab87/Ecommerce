const { Router } = require("express");
const userModel = require("../models/user");
const { createHash, isValidPassword } = require("../utils");
const passport = require("passport");

const router = Router();

router.post('/register', passport.authenticate('register', {failureRedirect:'/api/session/registerFail'}), async (req, res) => {

    res.send({status: 'success', message: 'user resgistered'})
})

router.get('/registerFail', async(req, res)=>{
    res.status(401).send({status:'error', error: 'authentication error'})
})

router.post('/login', passport.authenticate('login', {failureRedirect:'/api/session/loginFail'}), async (req, res) => {
    try {   
        const user = req.user
        const rol= user.isAdmin ? 'admin' : 'usuario'

        req.session.user = {
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            age: user.age,
            rol: rol
        }
        
        res.send({status:'success', payload: req.session.user, message: 'success'})
    
    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        res.status(500).send({ status: 'error', error: 'internal server error' });
    }
})

router.get('/loginFail', async(req, res)=>{
    res.status(401).send({status:'error', error: 'login fail'})
})

router.get('/logout', (req, res )=>{
    req.session.destroy((err)=>{
        if(err) return res.status(500).send('there was an error')
    })
    res.redirect('/login')
})

router.post('/resetPassword', async (req, res) =>{
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
})



module.exports = router