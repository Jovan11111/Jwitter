const nodemailer = require("nodemailer");

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

module.exports = {sendFrReqEmail};