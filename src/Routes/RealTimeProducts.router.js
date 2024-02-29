const {Router} = require(`express`);
const manager = require("../dao/dbManagers/products");

const router = Router();

router.post('/', async (req, res) => {
    const product = req.body
    
    const data = await manager.addProduct(product);

    if(data){
        res.send({status:`succes`})
        
        } else{
            res.status(400).send(`Error, datos incompletos o código repetido`)
    }
})

module.exports = router
