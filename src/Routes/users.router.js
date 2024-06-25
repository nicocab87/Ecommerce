const { Router } = require("express");
const UserController = require("../controllers/user.controller");
const { checkRole } = require("../middlewares/checkRole.middleware");
const upload = require("../middlewares/fileUpload.middleware");

const router = Router();

router.put('/changeRol/:userId', UserController.changeRole)
router.delete('/deleteUser/:userId', checkRole(['admin']) ,UserController.deleteUser)
router.get('/:uid/documents',upload.array('document'), UserController.uploadDocument)
router.post('/:uid/profilePicture', upload.single('picture'), UserController.uploadPicture)
router.delete('/',checkRole(['admin']), UserController.deleteUnactive)


module.exports = router