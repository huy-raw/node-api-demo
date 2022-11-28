const User = require("../models/User")
const Token = require('../models/Token')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const authController = {
    //REGISTER
    register: async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt)

            //create new user
            const newUser = await new User({
                username: req.body.username,
                email: req.body.email,
                password: hashed
            });

            //save to db 
            const user = await newUser.save()
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    //GENERATE ACCESS TOKEN
    generateAccessToken: (user) => {
        return jwt.sign(
            {
                id: user.id,
                admin: user.admin
            },
            process.env.JWT_ACCESS_KEY,
            {
                expiresIn: "2m"
            },
        )
    },
    //GENERATE REFRESH TOKEN
    generateRefreshToken: (user) => {
        return jwt.sign(
            {
                id: user.id,
                admin: user.admin
            },
            process.env.JWT_REFRESH_KEY,
            {
                expiresIn: "365d"
            },
        )
    },
    requestRefreshToken: async (req, res) => {
        //Take refresh token from user
        const refreshToken = req.cookies.refreshToken
        const token = await Token.findOne({ refreshToken: refreshToken })
        if (!refreshToken) return res.status(401).json("You're not authenticated.")
        if (!token) {
            return res.status(403).json("Refresh token is not valid.")
        }
        jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
            if (err) {
                console.log(err)
            }
            //create new access token, refresh token 
            const newAccessToken = authController.generateAccessToken(user)
            const newRefreshToken = authController.generateRefreshToken(user)
            Token.findOneAndReplace({ refreshToken: refreshToken }, newRefreshToken)
            res.cookie("refreshToken", newRefreshToken, {
                httpOnly: true,
                sercure: false,
                path: "/",
                sameTime: "strict"
            })
            res.status(200).json({
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
            })
        })
    },
    //LOGIN
    login: async (req, res) => {
        try {
            const user = await User.findOne({ username: req.body.username })
            if (!user) {
                res.status(404).json("Wrong username.")
            }
            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            )
            if (!validPassword) {
                res.status(404).json("Wrong password.")
            }
            if (user && validPassword) {
                const accessToken = authController.generateAccessToken(user)
                const refreshToken = authController.generateRefreshToken(user)

                const token = await new Token({
                    refreshToken: refreshToken
                })
                await token.save()
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    sercure: false,
                    path: "/",
                    sameTime: "strict"
                })
                const { password, ...others } = user._doc
                res.status(200).json({ ...others, accessToken })
            }

        } catch (error) {
            res.status(500).json(error)
        }
    },
    logout: async (req, res) => {
        try {
            const refreshToken = req.cookies.refreshToken
            if (!refreshToken) {
                res.status(401).json("You're not login.")
            }
            Token.deleteOne({ refreshToken: refreshToken })
            res.clearCookie('refreshToken');
            res.status(200).json("Logout successfully.")
        } catch (error) {
            res.status(500).json(error)
        }
    }
}




module.exports = authController;