import mongoose from 'mongoose'

const tokenSchema = new mongoose.Schema(
    {
        refreshToken: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model('Token', tokenSchema)