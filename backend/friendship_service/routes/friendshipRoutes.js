const express = require("express");
const { 
    sendFrReq, 
    declineFrReq, 
    acceptFrReq, 
    getPendingFrReq, 
    getUserFriends, 
    areTheyFriends, 
    removeFriend,
    deleteUserFrReqsAndFrShips
} = require("../controllers/friendshipController");

const router = express.Router();

/**
 * @route POST /api/friend/request/:sender/:receiver
 * @desc Send a friend request
 */
router.post("/sendFrReq/:sender/:receiver", sendFrReq);

/**
 * @route POST /api/friend/request/:id/decline
 * @desc Decline a friend request
 */
router.post("/declineFrReq/:id", declineFrReq);

/**
 * @route POST /api/friend/request/:id/accept
 * @desc Accept a friend request
 */
router.post("/acceptFrReq/:id", acceptFrReq);

/**
 * @route GET /api/friend/requests/:userId
 * @desc Get pending friend requests for a user
 */
router.get("/getPendingFrReq/:userId", getPendingFrReq);

/**
 * @route GET /api/friend/list/:userId
 * @desc Get a user's friends list
 */
router.get("/getUserFriends/:userId", getUserFriends);

/**
 * @route GET /api/friend/check/:id1/:id2
 * @desc Check if two users are friends
 */
router.get("/areTheyFriends/:id1/:id2", areTheyFriends);

/**
 * @route DELETE /api/friend/remove/:id1/:id2
 * @desc Remove a friend connection
 */
router.delete("/removeFriend/:id1/:id2", removeFriend);

/**
 * 
 */
router.delete("/deleteUserFrReqsAndFrShips/:id", deleteUserFrReqsAndFrShips);

module.exports = router;
