const {Router} = require(`express`);
const manager = require("../dao/dbManagers/products");

const router = Router();

router.get('/', async (req, res) => {
    let page = req.query.page || 6
    let limit = req.query.limit || 6
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
    
    try {
        res.send({product, ...rest, nextLink, prevLink})
    } catch (error) {
        res.status(440).send(error)
    }
})

router.post('/', async (req, res) => {
    const product = req.body

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
