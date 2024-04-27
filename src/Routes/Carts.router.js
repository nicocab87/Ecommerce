const {Router} = require(`express`);
const cartsController = require("../controllers/carts.controller");
const { checkRole } = require("../middlewares/checkRole.middleware");

const router = Router();

router.post(`/`, checkRole('user') ,cartsController.create)

router.get(`/`, cartsController.get)

router.get(`/:cid`, cartsController.getById)

router.post(`/:cid/product/:pid`,cartsController.addProductToCart)

router.put('/:cid/product/:pid', checkRole('user'),cartsController.changeQuantityOfProduct)

router.delete('/:cid', cartsController.delete)

router.delete('/:cid/products/:pid', cartsController.deleteProduct)

router.get('/:cid/purchase', cartsController.purchase)

module.exports = router
