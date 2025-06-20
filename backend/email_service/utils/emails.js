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

    try{
        await transporter.sendMail(mailOptions);
    } catch(error){
        console.log("Receiver email is invalid: ", error);
    }
};

const sendNewMsgEmail = async (to, sender, content) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }
    });


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
    
    try{
        await transporter.sendMail(mailOptions);
    } catch(error){
        console.log("Receiver email is invalid: ", error);
    }
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

    try{
        await transporter.sendMail(mailOptions);
    } catch(error){
        console.log("Receiver email is invalid: ", error);
    }
    
};

const sendDeletedPostEmail = async(to, title, pid, uid) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user:  process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }
    });

    appealLink = `http://localhost:3000/appeal-deleted-post/${pid}/${uid}`;

    const mailOptions = {
        from: '"Jwitter"',
        to,
        subject: "Deleted post",
        html: `
            <h3>Your post ${title} has beed deleted</h3>
            <p>Sadly, this post was deemed too offensive and not in line with Jwitter</p>
            <p>If you don't agree, please appeal so the post can be returned</p>
            <a href="${appealLink}">Appeal Here</a>
        `
    };

    try{
        await transporter.sendMail(mailOptions);
    } catch(error){
        console.log("Receiver email is invalid: ", error);
    }
};

const sendDeletedAccountEmail = async(to, username) => {
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
        subject: "Deleted account",
        html: `
            <h3>Your post Jwitter account has beed deleted</h3>
            <p>Sadly, your account ${username} broke the Jwitter rules too many times.</p>
        `
    };
    
    try{
        await transporter.sendMail(mailOptions);
    } catch(error){
        console.log("Receiver email is invalid: ", error);
    }
};

const sendDeclineAppealEmail = async (to, title) => {
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
        subject: "Post appeal has been declined",
        html: `
            <h3>The appeal you submitted has been declined</h3>
            <p>Sadly, the post with the title ${title} has been reviewed, and it has been decided that post post should stay deleted.</p>
        `
    };
    
    try{
        await transporter.sendMail(mailOptions);
    } catch(error){
        console.log("Receiver email is invalid: ", error);
    }
}

const sendAcceptAppealEmail = async (to, title) => {
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
        subject: "Appeal has been accepted",
        html: `
            <h3>The appeal that you submitted has been accepted</h3>
            <p>The post with the title ${title} has been reviewed, and it has been decided that it did not break the Jwitter rules</p>
            <p>Thank you for appealing, and sorry for the incovinience</p>
        `
    };
    
    try{
        await transporter.sendMail(mailOptions);
    } catch(error){
        console.log("Receiver email is invalid: ", error);
    }
}

const sendEmail = async (to, title, content) => {
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
        subject: title,
        html: content
    };
    
    try{
        await transporter.sendMail(mailOptions);
    } catch(error){
        console.log("Receiver email is invalid: ", error);
    }
}

module.exports = { 
    sendResetEmail, 
    sendNewMsgEmail, 
    sendFrReqEmail,
    sendDeletedPostEmail,
    sendDeletedAccountEmail,
    sendDeclineAppealEmail,
    sendAcceptAppealEmail,
    sendEmail
};
