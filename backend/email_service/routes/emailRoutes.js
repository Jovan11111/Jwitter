const express = require("express");
const { 
        sendResetEmailC,
        sendNewMsgEmailC,
        sendFrReqEmailC,
        sendDeletedPostEmailC
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

module.exports = router

