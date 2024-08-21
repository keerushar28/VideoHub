export const EMAIL_VERIFICATION_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #007BFF;
        }
        p {
            font-size: 16px;
            line-height: 1.5;
        }
        .otp {
            font-size: 24px;
            font-weight: bold;
            color: #007BFF;
            margin: 20px 0;
            text-align: center;
        }
        .footer {
            margin-top: 30px;
            font-size: 14px;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Verify Your Email Address</h1>
        <p>Dear [USER_NAME],</p>
        <p>Thank you for registering with Futsal Booking App. To complete your registration, please verify your email address by using the One-Time Password (OTP) provided below:</p>
        <p class="otp">[OTP_CODE]</p>
        <p>This OTP is valid for 1 hour, so please ensure you enter it promptly. If you did not initiate this request, please disregard this email.</p>
        <p class="footer">Thank you for choosing us!!.</p>
    </div>
</body>
</html>
`;
export const WELCOME_TEMPLATE =`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Futsal Booking App</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            color: #333;
            line-height: 1.6;
            padding: 20px;
            margin: 0;
            background-color: #f4f4f4;
        }
        .container {
            max-width: 600px;
            margin: auto;
            background: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .header {
            background: #007bff;
            color: #fff;
            padding: 10px;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }
        .content {
            margin-top: 20px;
        }
        .footer {
            margin-top: 20px;
            font-size: 0.9em;
            text-align: center;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Welcome to Futsal Booking App!</h1>
        </div>
        <div class="content">
            <p>Hi [Username],</p>
            <p>Thank you for verifying your email address. We're excited to have you on board!</p>
            <p>Feel free to explore the app and start booking futsal courts. If you have any questions or need support, don't hesitate to reach out.</p>
        </div>
        <div class="footer">
            Best regards,<br>
            The Futsal Booking App Team
        </div>
    </div>
</body>
</html>
`;

