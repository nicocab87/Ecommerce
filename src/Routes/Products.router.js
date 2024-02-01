const {Router} = require(`express`);
const nuevoProducto = require ("../ProductManager");

const router = Router();


router.get('/', async (req, res) => {

    const data = await nuevoProducto.getProducts();
    const productsLimit = req.query.limit;

    const productsFiltered = data.filter((products)=>products.id <= productsLimit)

    res.send(!productsLimit ? data : productsFiltered)
})

router.post('/', async (req, res) => {
    const product = req.body
    const productValue = Object.values(product)
    
    await nuevoProducto.addProduct(productValue);

    res.send({status:`succes`})
})

router.get(`/:pid`, async (req, res) => {
    const productId = req.params.pid

    if(!isNaN(productId)){
        const data = await nuevoProducto.getProductById(parseInt(productId))
        const error = `ERROR 404, el producto solicitado no existe`
    
        if(!data){
            res.status(404)
            return res.send(error)
        }
    
        res.send(data)
    }
})

router.put(`/:pid`, async(req, res) => {
    const productId = req.params.pid
    const productToUpdate = req.body
    const productKey = Object.keys(productToUpdate)
    const productValue = Object.values(productToUpdate)
    const key = productKey.join("")
    const value = productValue.join("")


    if(!isNaN(productId)){
        const data = await nuevoProducto.updateProduct(parseInt(productId), key, value)
        const error = `ERROR 404, el producto no existe o la propiedad a modificar es inexistente`
        
        if(!data){
            res.status(404)
            return res.send(error)
        }
    
        res.send({status:`succes`})
    }
})

router.delete('/:pid', async(req, res) =>{
    const productId = req.params.pid

    if(!isNaN(productId)){
        const data = await nuevoProducto.deleteProduct(parseInt(productId))
        const error = `ERROR 404, el producto solicitado no existe`
    
        if(!data){
            res.status(404)
            return res.send(error)
        }
    
        res.send({status:`succes`})
    }
})


module.exports = router