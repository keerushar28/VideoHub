import mongoose from "mongoose";

const useSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true,

    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    avatar: {
        type: String,
        required: true,

    },
    coverImage: {
        type: String,
    },
    watchHistory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Video'

        }
    ],
    address: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    OTP: {
        type: String,
    },
    OTPExpiresAt: {
        type: Date,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    lastLogin: {
        type: Date,
        default: Date.now()
    },
    resetToken: {
        type: String,

    },
    resetTokenExpiresAt: {
        type: Date,
    }
}
    , {
        timestamps: true
    })
const User = new mongoose.model('User', useSchema)
export default User;