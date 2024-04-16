const {Router} = require(`express`);
const cartsController = require("../controllers/carts.controller");

const router = Router();

router.post(`/`, cartsController.create)

router.get(`/`, cartsController.get)

router.get(`/:cid`, cartsController.getById)

router.post(`/:cid/product/:pid`, cartsController.addProductToCart)

router.put('/:cid/product/:pid', cartsController.changeQuantityOfProduct)

router.delete('/:cid', cartsController.delete)

router.delete('/:cid/products/:pid', cartsController.deleteProduct)

module.exports = router
