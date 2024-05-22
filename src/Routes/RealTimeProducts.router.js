const {Router} = require(`express`);
const realTimeProductsController = require("../controllers/realTimeProducts.controller");
const { checkRole } = require("../middlewares/checkRole.middleware");

const router = Router();

router.post('/', checkRole(['admin','premium']) ,realTimeProductsController.create)

module.exports = router
