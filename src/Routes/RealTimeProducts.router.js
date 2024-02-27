const {Router} = require(`express`);
const manager = require("../dao/dbManagers/products");

const router = Router();

router.get('/', async (req, res) => {

    const data = await manager.getProducts();
    const productsLimit = req.query.limit;

    const productsFiltered = data.filter((products)=>products.id <= productsLimit)

    const dataToRender = (!productsLimit ? data : productsFiltered)

    console.log('Real time products')

    res.render('realTimeProducts', {dataToRender} )
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

module.exports = router
