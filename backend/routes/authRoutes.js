const express = require("express");
const router = express.Router();

const { signup, login, logout } = require("../controller/authController");

// Auth Routes
router.post("/register", signup); // Register with new account
router.post("/login", login); // Login with existing account
router.post("/logout", logout); // Logout from current account

module.exports = router;
