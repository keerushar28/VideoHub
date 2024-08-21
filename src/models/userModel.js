import mongoose from "mongoose";

const useSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true

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


}
    , {
        timestamps: true
    })
const User = new mongoose.model('User', useSchema)
export default User;