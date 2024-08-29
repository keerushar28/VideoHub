import bcrypt from 'bcrypt';
import User from "../models/userModel.js";
import generateOTP from "../utils/generateOTP.js";
import { forgotPasswordEmail, resetPasswordEmail, sendEmail, welcomeEmail } from '../utils/sendEmail.js';
import { generateCookie } from '../utils/cookies.js';
import crypto from 'crypto'

export const register = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;

        if (!name || !email || !password || !phone || !address) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User Already Registered" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        const OTP = generateOTP();

        // Create a new user
        const user = new User({
            name,
            email,
            password: hashedPassword,
            OTP,
            phone,
            address,
            OTPExpiresAt: Date.now() + 60 * 60 * 1000 // OTP expires in 1 hour
        });
        await sendEmail(email, "Please Verify Your Email with OTP", OTP, name);


        // Save the user to the database
        await user.save();

        // Send response
        res.status(201).json({ message: "User Created Successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const verifyemail = async (req, res) => {
    try {
        const { otp } = req.body;
        const user = await User.findOne({
            OTP: otp,
            OTPExpiresAt: { $gt: Date.now() }

        });
        if (!user) {
            return res.status(400).json({ message: "Invalid OTP or code is expired please try again" });
        }
        user.isVerified = true,
            user.OTPExpiresAt = null,
            user.OTP = null,
            await user.save();
        welcomeEmail(user.email, "Welcome", user.name)
        res.status(200).json({ message: "Email Verified Successfully" });


    } catch (error) {
        console.error("Error During Verification", error.message)
        res.status(500).json({ message: "Internal Server Error", error: error.message });

    }

}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Email doesn't exist please register" });
        }
        if (!user.isVerified) {
            return res.status(400).json({ message: "Please Verify Your Email First" });
        }
        const isValidPassword = await bcrypt.compare(password, user.password)
        if (!isValidPassword) {
            return res.status(400).json({ message: "Invalid Email or Password" });
        }
        generateCookie(res, user._id);
        user.lastLogin = Date.now();
        await user.save();
        res.status(200).json({
            message: "Login Successfully", user: {
                ...user._doc,
                password: undefined,
                resetToken: undefined,
                resetTokenExpiresAt: null
            }
        });





    } catch (error) {
        console.error(error);
        res.status(500).json({ error });

    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie('jwt');
        res.status(200).json({ message: "Logged Out Successfully" });



    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error",
            error
        });

    }
}

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Email doesnot exist" })
        }
        const token = crypto.randomBytes(32).toString("hex");
        user.resetToken = token
        user.resetTokenExpiresAt = Date.now() + 60 * 60 * 1000 //1hr
        await user.save();
        await forgotPasswordEmail(user.email, "Forgot Your Password", `${process.env.CLIENT_URI}/reset-password/${token}`)
        res.status(200).json({
            message: "Email Sent Successfully",
            token
        });




    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", error })

    }
}

export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password, confirmPassword } = req.body;
        const user = await User.findOne({
            resetToken: token,
            resetTokenExpiresAt: { $gt: Date.now() }
        });
        if (!user) {
            return res.status(401).json({ message: "Invalid Token" })
        }
        if (password !== confirmPassword) {
            return res.status(401).json({ message: "Passwords do not match" })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        user.password = hashedPassword;
        user.resetToken = null;
        user.resetTokenExpiresAt = null;
        await user.save();
        res.status(200).json({ message: "Password Reset Successfully" })
        await resetPasswordEmail(user.email, "Password Reset Success");




    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", error })

    }
}
export const checkAuth = async (req, res) => {
    try {
        const user = await User.findById(req.userID).select("-password")
        if (!user) return res.status(401).json({ message: "No user - unauthorized" })
        res.status(200).json({
            message: "Validate Successfully",
            user
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", error })

    }
}