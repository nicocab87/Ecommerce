const {Router} = require ("express");
const manager = require("../dao/dbManagers/products");
const managerCart = require("../dao/dbManagers/cart");


const router = Router();

router.get('/', async (req, res) => {
    try {
        res.render('home', {} )
    } catch (error) {
        res.status(440).send(error)
    }
})

router.get('/products', async (req, res) => {

    let page = req.query.page || 1
    let limit = req.query.limit || 5
    let query = req.query.query
    let querySort = req.query.sort
    let opt = {}
    let sort


    if(req.query.query){
        opt = {
            $or: [
                { description: { $regex: query, $options: 'i' } }, 
                { category: { $regex: query, $options: 'i' } }
            ]
        }
    }

    querySort === "asc" && (sort = { price: -1 })
    querySort === "desc" && (sort = { price: 1 })

    let { docs, ...rest } = await manager.getPaginate(page, limit, opt, sort)

    let product = docs

    let nextLink = rest.hasNextPage ? `products?page=${rest.nextPage}&limit=${limit} ` : null
    let prevLink =rest.hasPrevPage ? `products?page=${rest.prevPage}&limit=${limit} ` : null

    res.render('products',{product, ...rest, nextLink, prevLink})
    //res.send({status:'succes', ...rest})
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

router.get('/carts/:cid', async (req,res) => {
    const cartId = req.params.cid

    try {
        const dataToRender = await managerCart.getCartsById(cartId)

        const {products} = dataToRender

        res.render('carts',{products})

    } catch (error) {
        res.status(404).send(error)
    }
})

router.get(`/:pid`, async (req, res) => {
    const productId = req.params.pid

    try {
    const dataToRender = await manager.getProductById(productId)
    res.render('home',{dataToRender})

    } catch (error) {
        res.status(404).send(error)
    }
})

module.exports = router;