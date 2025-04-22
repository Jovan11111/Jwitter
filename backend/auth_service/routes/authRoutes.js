const express = require("express");
const { loginUser, 
        registerUser, 
        getUser, 
        deleteProfile,
        deleteProfileNoPass, 
        changePassword, 
        forgotPassword, 
        resetPassword, 
        saveNotificationSettings, 
        saveVisibilitySettings,
        reportUser,
        searchUsers,
        acceptAppeal,
        getAllUsers,
        switchUserRole
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
router.post("/deleteProfileNoPass", deleteProfileNoPass);
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

/**
 * 
 */
router.post("/reportUser/:id", reportUser);

/**
 * 
 */
router.get('/searchUsers/:query', searchUsers);

/**
 * 
 */
router.get('/acceptAppeal/:id', acceptAppeal);

/**
 * 
 */
router.get('/getAllUsers', getAllUsers);

/**
 * 
 */
router.post('/switchUserRole', switchUserRole);

module.exports = router;
