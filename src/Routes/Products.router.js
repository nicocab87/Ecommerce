const {Router} = require(`express`);
const manager = require("../dao/dbManagers/products");

const router = Router();

router.get('/', async (req, res) => {
    const data = await manager.getProducts();
    const productsLimit = parseInt(req.query.limit);

    const productsFiltered = data.slice(0, productsLimit);

    const dataToRender = (!productsLimit ? data : productsFiltered)
    try {
        res.send({dataToRender} )
    } catch (error) {
        res.status(440).send(error)
    }
})

router.post('/', async (req, res) => {
    const product = req.body
    console.log('product',product)

    try {
        const data = await manager.addProduct(product);
        res.send({status:`succes`})

    } catch (error) {
        res.status(400).send(`Error, datos incompletos o código repetido`)
        console.error(error)
    }
})

router.put(`/:pid`, async(req, res) => {
    const productId = req.params.pid
    const productToUpdate = req.body

    try {
        const data = await manager.updateProduct(productId, productToUpdate)
        res.send(data)

    } catch (error) {
        res.status(404).send('Id o propiedad a cambiar no existe')
        console.error(error)
    }
})

router.delete('/:pid', async(req, res) =>{
    const productId = req.params.pid

    try {
        await manager.deleteProduct(productId)
        res.send({status:`succes`})
    } catch (error) {
        res.status(404).send(error)
    }
})

module.exports = router
