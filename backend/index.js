const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cookieParse = require('cookie-parser')
const authRoute = require('./routers/auth')
const userRoute = require('./routers/user')
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
})

