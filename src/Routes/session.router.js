const { Router } = require("express");
const userModel = require("../models/user");

const router = Router();

router.post('/register', async (req, res) => {
    const {first_name, last_name, email, age, password} = req.body;

    console.log(req.body)

    if(!first_name || !last_name || !email || !age || !password){
        return res.status(400).send({status:'erros', error: 'missing data'})
    }

    const data = await userModel.create({first_name, last_name, email, age, password});

    res.send({status: 'success', message: 'user resgistered'})
})

router.post('/login', async (req, res) => {
    const {email, password} = req.body;

    if( !email || !password){
        return res.status(400).send({status:'erros', error: 'missing data'})
    }

    try {
        const user = await userModel.findOne({email, password});

        if(!user){
            return res.status(401).send({status:'error', error: 'incorrect credentials'})
        }

        const rol= user.admin ? 'admin' : 'usuario'

        console.log(`rol ${rol}`)
    
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

router.get('/logout', (req, res )=>{
    req.session.destroy((err)=>{
        if(err) return res.status(500).send('there was an error')
    })
    res.redirect('/login')
})



module.exports = router