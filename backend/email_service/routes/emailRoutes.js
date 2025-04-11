const express = require("express");
const { 
        sendResetEmailC,
        sendNewMsgEmailC,
        sendFrReqEmailC,
        sendDeletedPostEmailC,
        sendDeletedAccountEmailC
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

module.exports = router

