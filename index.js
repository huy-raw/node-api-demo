import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cookieParse from 'cookie-parser'
import authRoute from './routers/auth.js'
import userRoute from './routers/user.js'
import swaggerDocs from './swagger.js'
const app = express()
dotenv.config();

mongoose.connect(process.env.MONGODB_URL, () => {
    console.log('CONNECTED TO MONGODB.')
})


app.use(cors())
app.use(cookieParse())
app.use(express.json())

//ROUTES
app.use('/v1/auth', authRoute)
app.use('/v1/user', userRoute)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}.`)
    swaggerDocs(app, process.env.PORT)
})

