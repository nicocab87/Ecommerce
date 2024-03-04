const {Router} = require(`express`);
const manager = require("../dao/dbManagers/products");

const router = Router();

router.post('/', async (req, res) => {
    const product = req.body

    try {
        await manager.addProduct(product);
        res.send({status:`succes`})

    } catch (error) {
        res.status(400).send(error)
    }
    
    
})

module.exports = router
