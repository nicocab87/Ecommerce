const { Router } = require("express");
const UserController = require("../controllers/user.controller");
const { checkRole } = require("../middlewares/checkRole.middleware");
const upload = require("../middlewares/fileUpload.middleware");

const router = Router();

router.get('/premium/:userId', UserController.changeRole)
router.get('/:uid/documents',upload.array('document'), UserController.uploadDocument)
router.post('/:uid/profilePicture', upload.single('picture'), UserController.uploadPicture)


module.exports = router