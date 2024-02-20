const {Router} = require(`express`);
const nuevoProducto = require ("../ProductManager");


const router = Router();

router.get('/', async (req, res) => {

    const data = await nuevoProducto.getProducts();
    const productsLimit = req.query.limit;

    const productsFiltered = data.filter((products)=>products.id <= productsLimit)

    const dataToRender = (!productsLimit ? data : productsFiltered)
    try {
        res.render('home', {dataToRender} )
    } catch (error) {
        res.status(440).send(error)
    }
    
})

router.post('/', async (req, res) => {
    const product = req.body
    const { title, category, description, price, code, stock } = product;
    
    const data = await nuevoProducto.addProduct( title, category, description, price, code, stock);

    

   if(data){
    res.send({status:`succes`})
    
    } else{
        res.status(400)
        res.send(`Error, datos incompletos o código repetido`)
    }

    
})

router.get(`/:pid`, async (req, res) => {
    const productId = req.params.pid

    if(!isNaN(productId)){
        const data = await nuevoProducto.getProductById(parseInt(productId))
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
            nuevoProducto.updateProduct(parseInt(productId), arr[0], arr[1])
            console.log(`idproduct ${productId}, key ${arr[0]}, value ${arr[1]}`)
        })
        const error = `ERROR 404, el producto no existe o la propiedad a modificar es inexistente`

        data ? res.send({status:`succes`}) : res.status(400).send(error)
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