const {Router} = require ("express");
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

// El error que salía antes es por causa de este código

// router.get(`/:pid`, async (req, res) => {
//     const productId = req.params.pid
//     const data = await manager.getProductById(parseInt(productId))
//     const error = `ERROR 404, el producto solicitado no existe`

//     !data ? res.status(404).send(error) : res.send(data)
// })


router.get('/realtimeproducts', async (req, res) => {

    const data = await manager.getProducts();

    try {
        res.render('realTimeProducts', {data} )
    } catch (error) {
        res.status(440).send(error)
    }
})

router.get('/chat', async (req, res) => {

    res.render('chat', {})
})

module.exports = router;