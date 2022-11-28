import middlewareController from '../controller/middlewareController.js'
import userController from '../controller/userController.js'
import express from 'express'
const router = express.Router()


//Get All User
router.get('/', middlewareController.verifyToken, userController.getAllUser)
//DELETE User
router.delete("/:id", middlewareController.verifyTokenAndAdminAuth, userController.deleteUser)
//GET by Id
router.get('/:id', userController.getUserById)

export default router