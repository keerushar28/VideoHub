import transporter from "../config/emailConfig.js";

const sendEmail = async (to, subject, text) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
        })
        console.log("Email Sent Successfully");



    } catch (error) {
        console.error("Error Sending Email", error)

    }
}
export default sendEmail;