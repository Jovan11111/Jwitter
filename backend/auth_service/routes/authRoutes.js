const express = require("express");
const { loginUser, registerUser, getUser } = require("../controllers/authController");

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

module.exports = router;
