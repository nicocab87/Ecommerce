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



router.get(`/:pid`, async (req, res) => {
    const productId = req.params.pid

    try {
    const data = await manager.getProductById(productId)
    res.send(data)

    } catch (error) {
        res.status(404).send(error)
    }
})


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