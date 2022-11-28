const authController = require('../controller/authController')
const middlewareController = require('../controller/middlewareController')
const router = require('express').Router()

// REGISTER
router.post('/register', authController.register)
// LOGIN
router.post('/login', authController.login)
//REFRESH
router.post("/refresh", authController.requestRefreshToken)
//Logout
// router.post('/logout', middlewareController.verifyToken, authController.logout)
router.post('/logout', authController.logout)

module.exports = router
