const {Router} = require(`express`);
const realTimeProductsController = require("../controllers/realTimeProducts.controller");

const router = Router();

router.post('/', realTimeProductsController.create)

module.exports = router
