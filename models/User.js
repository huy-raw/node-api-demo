import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            minlenght: 6,
            maxlenght: 20,
            unique: true
        },
        email: {
            type: String,
            required: true,
            minlenght: 6,
            maxlenght: 20,
            unique: true
        },
        password: {
            type: String,
            required: true,
            minlenght: 6,
            maxlenght: 20,
        },
        admin: {
            type: Boolean,
            default: false,

        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model('User', userSchema)