const {
    sendResetEmail,
    sendFrReqEmail,
    sendNewMsgEmail,
    sendDeletedPostEmail,
    sendDeletedAccountEmail,
    sendDeclineAppealEmail,
    sendAcceptAppealEmail
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
        console.log("Dosao do slanja mejla u backendu ", to);
        
        await sendFrReqEmail(to);

        console.log("Uspeo da posalje mejl");
        
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
        const {to, title, pid, uid} = req.body
        
        await sendDeletedPostEmail(to, title, pid, uid);

        return res.status(200).json({message: "Deleted post email was sent"});
    } catch (error){
        res.status(500).json({ message: `Server error: ${error.message}` });        
    }
}

/**
 * 
 */
const sendDeletedAccountEmailC = async (req, res) => {
    try {
        const {to, username} = req.body

        await sendDeletedAccountEmail(to, username);
    
        return res.status(200).json({message: "Deleted account email was sent"});
    } catch(error){
        res.status(500).json({ message: `Server error: ${error.message}` });        
    }
    
}

/**
 * 
 */
const sendDeclineAppealEmailC = async (req, res) => {
    try {
        const {to, title} = req.body;

        await sendDeclineAppealEmail(to, title);

        return res.status(200).json({message: "Decline Appeal email sent"});
    } catch(error){
        res.status(500).json({ message: `Server error: ${error.message}` });        
    }
}

/**
 * 
 */
const sendAcceptAppealEmailC = async (req, res) => {
    try {
        const {to, title} = req.body;

        console.log("Pokupio podatke: ", to, title);
        
        await sendAcceptAppealEmail(to, title);

        return res.status(200).json({message: "Accept Appeal email sent"});
    } catch(error){
        res.status(500).json({ message: `Server error: ${error.message}` });        
    }
}

module.exports = {
    sendResetEmailC,
    sendNewMsgEmailC,
    sendFrReqEmailC,
    sendDeletedPostEmailC,
    sendDeletedAccountEmailC,
    sendDeclineAppealEmailC,
    sendAcceptAppealEmailC
}