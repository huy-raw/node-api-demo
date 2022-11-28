const middlewareController = require('../controller/middlewareController')
const userController = require('../controller/userController')

const router = require('express').Router()


//Get All User
router.get('/', middlewareController.verifyToken, userController.getAllUser)
//DELETE User
router.delete("/:id", middlewareController.verifyTokenAndAdminAuth, userController.deleteUser)
//GET by Id
router.get('/:id', userController.getUserById)


module.exports = router