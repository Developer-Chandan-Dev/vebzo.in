const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  logout,
  me,
  updateProfile,
} = require("../controller/authController");

const { protect } = require("../middlewares/authMiddleware");
const validate = require("../middlewares/validation.middleware");
const {
  userValidationSchema,
  userUpdateValidationSchema,
} = require("../validations/user.validation");
const { loginValidationSchema } = require("../validations/auth.validation");

// Auth Routes
router.post("/register", validate(userValidationSchema), signup); // Register with new account
router.post("/login", validate(loginValidationSchema), login); // Login with existing account
router.post("/logout", logout); // Logout from current account
router.get("/me", protect, me); // Logout from current account
router.put(
  "/md/:id",
  validate(userUpdateValidationSchema),
  protect,
  updateProfile
); // Route for updating user details

module.exports = router;
