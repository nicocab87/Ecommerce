const {Router} = require(`express`);
const productsController = require("../controllers/products.controller");

const router = Router();

router.get('/', productsController.get)

router.post('/', productsController.create)

router.put(`/:pid`, productsController.update)

router.delete('/:pid', productsController.delete)

module.exports = router
