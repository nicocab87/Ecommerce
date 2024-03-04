const {Router} = require(`express`);
const CartManager = require("../dao/dbManagers/cart");


const manager = new CartManager ()
const router = Router();

router.post(`/`, async (req, res) => {

    try {
        await manager.addCart();
        res.send({Status:`Succes`})

    } catch (error) {
        res.status(404).send(error)
    }
})

router.get(`/:cid`, async (req,res) => {
    const idCart = req.params.cid;

    try {
        const data = await manager.getCartsById(idCart)
        res.send(data)

    } catch (error) {
        res.status(404).send(error)
    }
})

router.post(`/:cid/product/:pid`, async (req, res) => {
    const idCart = req.params.cid;
    const idProduct = req.params.pid;

    try {
        const data = await manager.addProductToCart(idCart, idProduct)
        res.send(data)

    } catch (error) {
        res.status(404).send(error)
    }
})

module.exports = router
