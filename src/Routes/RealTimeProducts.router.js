const {Router} = require(`express`);
const nuevoProducto = require ("../ProductManager");

const router = Router();

router.get('/', async (req, res) => {

    const data = await nuevoProducto.getProducts();
    const productsLimit = req.query.limit;

    const productsFiltered = data.filter((products)=>products.id <= productsLimit)

    res.render('realTimeProducts', (!productsLimit ? {data} : {productsFiltered}))
})

router.post('/', async (req, res) => {
    const product = req.body
    const { title, category, description, price, code, stock } = product;
    
    const data = await nuevoProducto.addProduct( title, category, description, price, code, stock);

   if(data){
    io.emit()
    res.send({status:`succes`})
    } else{
        res.status(400)
        res.send(`Error, datos incompletos o código repetido`)
    }

    
})

module.exports = router