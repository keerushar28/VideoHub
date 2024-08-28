import transporter from "../config/emailConfig.js";
import { EMAIL_VERIFICATION_TEMPLATE, WELCOME_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } from "./emailTemplate.js";

export const sendEmail = async (to, subject, text, uname) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
            html: EMAIL_VERIFICATION_TEMPLATE.replace("[OTP_CODE]", text).replace("[USER_NAME]", uname)
        })
        console.log("Email Sent Successfully");



    } catch (error) {
        console.error("Error Sending Email", error)

    }
}

export const welcomeEmail = async (to, subject, uname) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            html: WELCOME_TEMPLATE.replace("[Username]", uname)
        })

        console.log("Email Sent Successfully");



    } catch (error) {
        console.error("Error Sending Email", error)

    }
}

export const forgotPasswordEmail = async (to, subject, text) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", text)
        })
        console.log("Email Sent Successfully")

    } catch (error) {
        console.error("Error Sending Email", error)


    }
}

export const resetPasswordEmail = async (to, subject,) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Successs"
        })
        console.log("Email Sent Successfully")

    } catch (error) {
        console.error("Error Sending Email", error)



    }
}
