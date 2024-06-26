const {Router} = require(`express`);
const productsController = require("../controllers/products.controller");
const { checkRole } = require("../middlewares/checkRole.middleware");

const router = Router();

router.get('/', productsController.get)

router.post('/', checkRole(['premium','admin']),productsController.create)

router.put(`/:pid`,productsController.update)

router.delete('/:pid', checkRole(['admin']) ,productsController.delete)

module.exports = router
