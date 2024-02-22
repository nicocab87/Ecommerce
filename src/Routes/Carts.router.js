const {Router} = require(`express`);
const mainCart = require("../dao/fileManagers/CartManager")

const router = Router();

router.post(`/`, async (req, res) => {
    await mainCart.addCart();

    res.send({Status:`Succes`})
})

router.get(`/:cid`, async (req,res) => {
    const idCart = req.params.cid;

    if(!isNaN(idCart)){
        const data = await mainCart.getCartsById(parseInt(idCart))
        const error = `ERROR 404, el producto solicitado no existe en el carrito`
    
        if(!data){
            res.status(404)
            return res.send(error)
        }
    
        res.send(data)
    }
})

router.post(`/:cid/product/:pid`, async (req, res) => {
    const idCart = req.params.cid;
    const idProduct = req.params.pid;

    if(!isNaN(idCart) && !isNaN(idProduct)){
    
        const data = await mainCart.addProductToCart(parseInt(idCart), parseInt(idProduct))
        const error = `ERROR 404, el producto solicitado no existe en el carrito`
    
        if(!data){
            res.status(404)
            return res.send(error)
        }
    
        res.send(data)
    }
    

})



module.exports = router