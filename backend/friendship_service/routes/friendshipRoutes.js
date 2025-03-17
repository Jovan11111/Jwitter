const express = require("express");
const { sendFrReq, declineFrReq, acceptFrReq, getPendingFrReq, getUserFriends, areTheyFriends, removeFriend } = require("../controllers/friendshipController");

const router = express.Router();

router.post('/sendFrReq/:sender/:receiver', sendFrReq)
router.post('/declineFrReq/:id', declineFrReq)
router.post('/acceptFrReq/:id', acceptFrReq)
router.get('/getPendingFrReq/:user_id', getPendingFrReq)
router.get('/getUserFriends/:user_id', getUserFriends)
router.get('/areTheyFriends/:id1/:id2', areTheyFriends)
router.delete('/removeFriend/:id1/:id2', removeFriend)
module.exports = router