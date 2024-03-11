const {Router} = require(`express`);
const managerCart = require("../dao/dbManagers/cart");

const router = Router();

router.post(`/`, async (req, res) => {

    try {
        await managerCart.addCart();
        res.send({Status:`Succes`})

    } catch (error) {
        res.status(404).send(error)
    }
})

router.get(`/`, async (req,res) => {
    try {
        const data = await managerCart.getCart()
        res.send(data)

    } catch (error) {
        res.status(404).send(error)
    }
})

router.get(`/:cid`, async (req,res) => {
    const idCart = req.params.cid;

    try {
        const data = await managerCart.getCartsById(idCart)
        res.send(data)

    } catch (error) {
        res.status(404).send(error)
    }
})

router.post(`/:cid/product/:pid`, async (req, res) => {
    const idCart = req.params.cid;
    const idProduct = req.params.pid;

    try {
        const data = await managerCart.addProductToCart(idCart, idProduct)
        res.send({status: "succeses", data})

    } catch (error) {
        res.status(404).send(error)
    }
})

router.put('/:cid/product/:pid', async (req, res) => {
    const idCart = req.params.cid;
    const idProduct = req.params.pid;
    const cantidad= req.body

    const number = cantidad.quantity

    try {
        const data = await managerCart.changeQuantityToProduct(idCart, idProduct, number)
        res.send({status: 'succes', data})
    } catch (error) {
        res.status(404).send(error)
    }
})

router.delete('/:cid', async (req, res) => {
    const idCart = req.params.cid;

    try {
        const data = await managerCart.deleteCart(idCart)
        res.send({status: 'succes', data})

    } catch (error) {
        res.status(404).send(error)
    }
})

router.delete('/:cid/products/:pid', async (req, res) => {
    const idCart = req.params.cid;
    const idProduct = req.params.pid;
    
    try {
        const data = await managerCart.deleteProductToCart(idCart,idProduct)
        res.send({status: 'succes', data})
    } catch (error) {
        res.status(404).send(error)
    }
})

module.exports = router
