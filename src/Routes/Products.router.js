const {Router} = require(`express`);
const manager = require("../dao/dbManagers/products");

const router = Router();

router.post('/', async (req, res) => {
    const product = req.body
    console.log('product',product)
    
    const data = await manager.addProduct(product);
    console.log(`data: ${data}`)

    if(data){
        res.send({status:`succes`})
        
        } else{
            res.status(400).send(`Error, datos incompletos o código repetido`)
    }
})

router.put(`/:pid`, async(req, res) => {
    const productId = req.params.pid
    const productToUpdate = req.body

    const data = await manager.updateProduct(productId, productToUpdate)

    !data ? res.status(404).send('Id o propiedad a cambiar no existe') : res.send(data)
})

router.delete('/:pid', async(req, res) =>{
    const productId = req.params.pid

    const data = await manager.deleteProduct(parseInt(productId))
    const error = `ERROR 404, el producto solicitado no existe`

    !data ? res.status(404).send(error) : res.send({status:`succes`})
})

module.exports = router
