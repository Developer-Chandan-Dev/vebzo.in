const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  logout,
  me,
  updateProfile,
  updateUserByAdmin,
  updatePassword,
} = require("../controller/authController");

const { protect, admin } = require("../middlewares/authMiddleware");
const validate = require("../middlewares/validation.middleware");
const {
  userValidationSchema,
  userUpdateValidationSchema,
} = require("../validations/user.validation");
const { loginValidationSchema } = require("../validations/auth.validation");
const upload = require("../middlewares/fileUploadMiddleware");

// Auth Routes
router.post("/register", validate(userValidationSchema), signup); // Register with new account
router.post("/login", validate(loginValidationSchema), login); // Login with existing account
router.post("/logout", logout); // Logout from current account
router.get("/me", protect, me); // Get profile data from current account
router.put("/me/:id", validate(userUpdateValidationSchema), protect, upload.single("imageUrl"), updateProfile); // Route for updating user details
router.put("/update-password", protect, updatePassword); // Route for updating user password

// Admin-only route for updating user details
router.put("/user/:id", protect, admin, updateUserByAdmin);

module.exports = router;
