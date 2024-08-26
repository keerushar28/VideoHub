import bcrypt from 'bcrypt';
import User from "../models/userModel.js";
import generateOTP from "../utils/generateOTP.js";
import { sendEmail, welcomeEmail } from '../utils/sendEmail.js';

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
        res.status(500).json({ message: "Internal Server Error" });

    }

}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if(!user)
        {
            return res.status(400).json({ message: "Invalid Email or Password" });
        }
        if(!user.isVerified)
        {
            return res.status(400).json({ message: "Please Verify Your Email First" });
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({ message: "Invalid Email or Password" });
            }
            

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error
        });

    }
}