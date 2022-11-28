const User = require("../models/User")

const userController = {
    //GET all user
    getAllUser: async (req, res) => {
        try {
            const user = await User.find()
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json()
        }
    },
    //DELETE user
    deleteUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id)
            if (!user) {
                res.status(400).json("User have id: " + req.params.id + " doesn't exist.")
            }
            if (user.admin) {
                res.status(403).json("Can't delete admin.")
            }
            res.status(200).json("Delete successfully.")
        } catch (error) {
            res.status(500).json()
        }
    },
    //GET by Id
    getUserById: async (req, res) => {
        try {
            const user = await User.findById(req.params.id)
            if (!user) {
                res.status(400).json("User have id: " + req.params.id + " doesn't exist.")
            }
        } catch (error) {
            res.status(500).json()
        }
    }
}

module.exports = userController;