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

const sendNewMsgEmail = async (to, sender, content) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }
    });

    const siteLink = 'http://localhost:3000/';

    const mailOptions = {
        from: '"Jwitter"',
        to, 
        subject: "New message",
        html: `
            <h3> New message! </h3>
            <p>You have a new message from ${sender}</p>
            message: ${content}
        `
    };
    console.log("DOSAO OVDE");
    
    await transporter.sendMail(mailOptions);
}

const sendFrReqEmail = async (to) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user:  process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }
    });

    const siteLink = `http://localhost:3000/`;

    const mailOptions = {
        from: '"Jwitter"',
        to,
        subject: "New Friendship request",
        html: `
            <h3> New Friendship request! </h3>
            <p>You have a new frined request</p>
            <a href="${siteLink}"> Check it out</a>
        `
    };

    await transporter.sendMail(mailOptions);
};

const sendDeletedPostEmail = async(to, title, content) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user:  process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }
    });


    const mailOptions = {
        from: '"Jwitter"',
        to,
        subject: "Deleted post",
        html: `
            <h3>Your post ${title} has beed deleted</h3>
            <p>Sadly, this post was deemed too offensive and not in line with Jwitter</p>
            <p>post content: ${content}</p>
        `
    };

    await transporter.sendMail(mailOptions);
}

module.exports = { 
    sendResetEmail, 
    sendNewMsgEmail, 
    sendFrReqEmail,
    sendDeletedPostEmail
};
