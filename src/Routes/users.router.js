const { Router } = require("express");
const UserController = require("../controllers/user.controller");
const { checkRole } = require("../middlewares/checkRole.middleware");

const router = Router();

router.get('/:userId',  UserController.changeRole)

module.exports = router