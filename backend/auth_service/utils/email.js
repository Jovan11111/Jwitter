const nodemailer = require("nodemailer");

const sendResetEmail = async (to, token) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const resetLink = `http://localhost:3000/reset-password/${token}`;

    const mailOptions = {
        from: '"Jwitter"',
        to,
        subject: "Password Reset Request",
        html: `
            <h3>Forgot your password?</h3>
            <p>Click the link below to reset your password:</p>
            <a href="${resetLink}">Reset Password</a>
            <p>If you didn’t request this, you can ignore this email.</p>
        `,
    };

    await transporter.sendMail(mailOptions);
};
module.exports = { sendResetEmail };
