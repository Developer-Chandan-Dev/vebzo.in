const express = require("express");
const passport = require("passport");
const router = express.Router();

const {
  googleAuth,
  signup,
  login,
  logout,
  me,
  updateProfile,
  updateUserByAdmin,
  updatePassword,
} = require("../controller/authController");

require("../config/passportConfig")

const rateLimiter = require("../middlewares/rateLimiterMiddleware");
const { protect, admin } = require("../middlewares/authMiddleware");
const validate = require("../middlewares/validation.middleware");
const {
  userValidationSchema,
  userUpdateValidationSchema,
} = require("../validations/user.validation");
const { loginValidationSchema } = require("../validations/auth.validation");
const upload = require("../middlewares/fileUploadMiddleware");

router.get('/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'consent'
  })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect(`${process.env.CLIENT_URL}/dashboard`); // Redirect to your frontend dashboard
  }
);

// Normal Auth Routes
router.post("/register", rateLimiter, validate(userValidationSchema), signup); // Register with new account
// router.post("/login", rateLimiter, validate(loginValidationSchema), login); // Login with existing account
router.post("/login", validate(loginValidationSchema), login); // Login with existing account
router.post("/logout", logout); // Logout from current account


router.get("/me", protect, me); // Get profile data from current account
router.put(
  "/me/:id",
  rateLimiter,
  validate(userUpdateValidationSchema),
  protect,
  upload.single("imageUrl"),
  updateProfile
); // Route for updating user details
router.put("/update-password/:id", rateLimiter, protect, updatePassword); // Route for updating user password

// Admin-only route for updating user details
router.put("/user/:id", rateLimiter, protect, admin, updateUserByAdmin);

module.exports = router;
