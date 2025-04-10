const {
    sendResetEmail,
    sendFrReqEmail,
    sendNewMsgEmail,
    sendDeletedPostEmail
} = require("../utils/emails")

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const sendResetEmailC = async (req, res) => {
    try {
        const {to, token} = req.body;
        
        await sendResetEmail(to, token);

        return res.status(200).json({message: "Reset email sent"});
    } catch (error){
        res.status(500).json({ message: `Server error: ${error.message}` });        
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const sendNewMsgEmailC = async (req, res) => {
    try {
        const {to, sender, content} = req.body;

        await sendNewMsgEmail(to, sender, content);

        return res.status(200).json({message: "New message email sent"});
    } catch (error){
        res.status(500).json({ message: `Server error: ${error.message}` });        
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const sendFrReqEmailC = async (req, res) => {
    try {
        const {to} = req.body
        
        await sendFrReqEmail(to);

        return res.status(200).json({message: "New Freind request email sent"});
    } catch (error){
        res.status(500).json({ message: `Server error: ${error.message}` });        
    }
}

/**
 * 
 */
const sendDeletedPostEmailC = async (req, res) => {
    try {
        const {to, title, content} = req.body
        console.log("USAO U KONTROLER");
        
        await sendDeletedPostEmail(to, title, content);

        return res.status(200).json({message: "Deleted post email was sent"});
    } catch (error){
        res.status(500).json({ message: `Server error: ${error.message}` });        

    }
}

module.exports = {
    sendResetEmailC,
    sendNewMsgEmailC,
    sendFrReqEmailC,
    sendDeletedPostEmailC
}