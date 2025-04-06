const express = require("express");
const { loginUser, 
        registerUser, 
        getUser, 
        deleteProfile, 
        changePassword, 
        forgotPassword, 
        resetPassword, 
        saveNotificationSettings, 
        saveVisibilitySettings 
    } = require("../controllers/authController");

const router = express.Router();

/**
 * @route POST /auth/register
 * @desc Register a new user
 */
router.post("/register", registerUser);

/**
 * @route POST /auth/login
 * @desc Authenticate user and return JWT token
 */
router.post("/login", loginUser);

/**
 * @route GET /auth/user/:id
 * @desc Get user by ID
 */
router.get("/user/:id", getUser);

/**
 * 
 */
router.post("/deleteProfile", deleteProfile);

/**
 * 
 */
router.post("/changePassword", changePassword);

/**
 * 
 */
router.post("/forgotPassword", forgotPassword);

/**
 * 
 */
router.post("/resetPassword/:token", resetPassword);

/**
 * 
 */
router.post("/saveNotificationSettings/:id", saveNotificationSettings);

/**
 * 
 */
router.post("/saveVisibilitySettings/:id", saveVisibilitySettings);
module.exports = router;
