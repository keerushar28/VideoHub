import dotenv from "dotenv";
dotenv.config()
import connectDB from "./config/dbconfig.js";
import sendEmail from "./utils/sendEmail.js";
import generateOTP from "./utils/generateOTP.js";
connectDB();
//sendEmail(process.env.CLIENT,'Check','Hi there !!1')
generateOTP();
