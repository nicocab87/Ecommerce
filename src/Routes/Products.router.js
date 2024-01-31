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
    console.log(product)
    const productValue = Object.values(product)
    console.log(productValue)

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


module.exports = router