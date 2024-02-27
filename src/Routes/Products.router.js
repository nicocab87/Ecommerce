const {Router} = require(`express`);
const manager = require("../dao/dbManagers/products");


const router = Router();

router.get('/', async (req, res) => {

    const data = await manager.getProducts();
    const productsLimit = parseInt(req.query.limit);

    const productsFiltered = data.slice(0, productsLimit);

    const dataToRender = (!productsLimit ? data : productsFiltered)
    try {
        res.render('home', {dataToRender} )
    } catch (error) {
        res.status(440).send(error)
    }
})

router.post('/', async (req, res) => {
    const product = req.body
    
    const data = await manager.addProduct(product);

    if(data){
        res.send({status:`succes`})
        
        } else{
            res.status(400).send(`Error, datos incompletos o código repetido`)
    }
})

router.get(`/:pid`, async (req, res) => {
    const productId = req.params.pid
    const data = await manager.getProductById(productId)
    const error = `ERROR 404, el producto solicitado no existe`
    
    !data ? res.status(404).send(error) : res.send(data)
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
