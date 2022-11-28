import authController from '../controller/authController.js'
// import middlewareController from '../controller/middlewareController'
import express from 'express'
const router = express.Router()
// REGISTER
router.post('/register', authController.register)
// LOGIN
router.post('/login', authController.login)
//REFRESH
router.post("/refresh", authController.requestRefreshToken)
//Logout
// router.post('/logout', middlewareController.verifyToken, authController.logout)
router.post('/logout', authController.logout)

export default router
