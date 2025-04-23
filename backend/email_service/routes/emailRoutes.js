const express = require("express");
const { 
        sendResetEmailC,
        sendNewMsgEmailC,
        sendFrReqEmailC,
        sendDeletedPostEmailC,
        sendDeletedAccountEmailC,
        sendDeclineAppealEmailC,
        sendAcceptAppealEmailC,
        sendEmailC
    } = require("../controllers/emailController");

const router = express.Router();

/**
 */
router.post("/reset", sendResetEmailC);

/**
 */
router.post("/msg", sendNewMsgEmailC);

/**
 * 
 */
router.post("/frreq", sendFrReqEmailC);

/**
 * 
 */
router.post("/delpost", sendDeletedPostEmailC);

/**
 * 
 */
router.post('/delacc', sendDeletedAccountEmailC);

/**
 * 
 */
router.post('/declineapp', sendDeclineAppealEmailC);

/**
 * 
 */
router.post('/acceptapp', sendAcceptAppealEmailC);

/**
 * 
 */
router.post('/sendEmail', sendEmailC);

module.exports = router

