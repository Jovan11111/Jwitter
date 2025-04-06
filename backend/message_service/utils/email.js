const nodemailer = require("nodemailer");

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

module.exports = {sendNewMsgEmail};