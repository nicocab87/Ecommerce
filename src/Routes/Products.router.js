const {Router} = require(`express`);
const ProductManager = require("../dao/dbManagers/products");


const manager = new ProductManager ()

const router = Router();

router.get('/', async (req, res) => {

    const data = await manager.getProducts();
    const productsLimit = req.query.limit;

    const productsFiltered = data.filter((products)=>products.id <= productsLimit)

    const dataToRender = (!productsLimit ? data : productsFiltered)
    try {
        res.render('home', {dataToRender} )
    } catch (error) {
        res.status(440).send({status:'empty'})
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

    if(!isNaN(productId)){
        const data = await manager.getProductById(parseInt(productId))
        const error = `ERROR 404, el producto solicitado no existe`
    
        if(!data){
            res.status(404)
            res.send(error)
        }
    
        res.send(data)
    }
})

router.put(`/:pid`, async(req, res) => {
    const productId = req.params.pid
    const productToUpdate = req.body
    const productArray = Object.entries(productToUpdate)

    if(!isNaN(productId)){

        const data = productArray.map(async (arr) => {
            manager.updateProduct(parseInt(productId), arr[0], arr[1])
            console.log(`idproduct ${productId}, key ${arr[0]}, value ${arr[1]}`)
        })
        const error = `ERROR 404, el producto no existe o la propiedad a modificar es inexistente`

        data ? res.send({status:`succes`}) : res.status(400).send(error)
    }
})

router.delete('/:pid', async(req, res) =>{
    const productId = req.params.pid

    if(!isNaN(productId)){
        const data = await manager.deleteProduct(parseInt(productId))
        const error = `ERROR 404, el producto solicitado no existe`
    
        if(!data){
            res.status(404)
            return res.send(error)
        }
    
        res.send({status:`succes`})
    }
})


module.exports = router