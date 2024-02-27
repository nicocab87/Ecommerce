const {Router} = require(`express`);
const CartManager = require("../dao/dbManagers/cart");


const manager = new CartManager ()
const router = Router();

router.post(`/`, async (req, res) => {
    await manager.addCart();

    res.send({Status:`Succes`})
})

router.get(`/:cid`, async (req,res) => {
    const idCart = req.params.cid;
    const data = await manager.getCartsById(idCart)
    const error = `ERROR 404, el producto solicitado no existe en el carrito`
    
    if(!data){
        res.status(404).send(error)
    }
    
    res.send(data)

})

router.post(`/:cid/product/:pid`, async (req, res) => {
    const idCart = req.params.cid;
    const idProduct = req.params.pid;

    if(isNaN(idCart) && isNaN(idProduct)){
    
        const data = await manager.addProductToCart(idCart, idProduct)
        const error = `ERROR 404, el producto solicitado no existe en el carrito`
    
        if(!data){
            res.status(404).send(error)
        }
    
        res.send(data)
    }
    

})

module.exports = router