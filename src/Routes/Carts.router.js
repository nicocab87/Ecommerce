const {Router} = require(`express`);
const CartManager = require("../dao/dbManagers/cart");

const router = Router();

router.post(`/`, async (req, res) => {

    try {
        await CartManager.addCart();
        res.send({Status:`Succes`})

    } catch (error) {
        res.status(404).send(error)
    }
})

router.get(`/:cid`, async (req,res) => {
    const idCart = req.params.cid;

    try {
        const data = await CartManager.getCartsById(idCart)
        res.send(data)

    } catch (error) {
        res.status(404).send(error)
    }
})

router.post(`/:cid/product/:pid`, async (req, res) => {
    const idCart = req.params.cid;
    const idProduct = req.params.pid;

    try {
        const data = await CartManager.addProductToCart(idCart, idProduct)
        res.send({status: "succeses", data})

    } catch (error) {
        res.status(404).send(error)
    }
})

router.put('/:cid/products/:pid', async (req, res) => {
    const idCart = req.params.cid;
    const idProduct = req.params.pid;
    const cantidad= req.body
    console.log(cantidad)

    const number = cantidad.quantity

    try {
        const data = await CartManager.changeQuantityToProduct(idCart, idProduct, number)
        res.send({status: 'succes', data})
    } catch (error) {
        res.status(404).send(error)
    }
})

router.delete('/:cid', async (req, res) => {
    const idCart = req.params.cid;

    try {
        const data = await CartManager.deleteCart(idCart)
        console.log('deletecart')
        res.send({status: 'succes', data})

    } catch (error) {
        res.status(404).send(error)
    }
})

router.delete('/:cid/products/:pid', async (req, res) => {
    const idCart = req.params.cid;
    const idProduct = req.params.pid;
    
    try {
        const data = await CartManager.deleteProductToCart(idCart,idProduct)
        res.send({status: 'succes', data})
    } catch (error) {
        res.status(404).send(error)
    }

})

module.exports = router
