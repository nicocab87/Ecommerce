const { Router } = require("express");
const passport = require("passport");
const sessionController = require("../controllers/session.contoller");

const router = Router();

router.post('/register', passport.authenticate('register', {failureRedirect:'/api/session/registerFail'}), sessionController.register)

router.get('/registerFail', sessionController.registerFail)

router.post('/login', passport.authenticate('login', {failureRedirect:'/api/session/loginFail'}), sessionController.login)

router.get('/loginFail', sessionController.loginFail)

router.get('/logout', sessionController.logOut)

router.post('/resetPassword', sessionController.resetPassword)

router.get('/github', passport.authenticate('github',{scope:['user:email']}, (req, res)=>{console.log('llegamos aca')}))

router.get('/githubCallback', passport.authenticate('github', { failureRedirect: '/login' }), sessionController.githubCallback);

router.get('/current', sessionController.current)


module.exports = router