const express = require("express");
const router = express.Router();
const {
  createNotification,
  getUserNotifications,
  markAsRead,
} = require("../controller/notificationsController");

const { protect, admin } = require("../middlewares/authMiddleware");

// Validation imports
const validate = require("../middlewares/validation.middleware");
const {
  createNotificationValidationSchema,
  updateNotificationValidationSchema,
} = require("../validations/validateNotifications");

// Create a notification
router.post(
  "/",
  protect,
  admin,
  validate(createNotificationValidationSchema),
  createNotification
);

// Fetch notifications for a specific user
router.get("/:userId", protect, getUserNotifications);

// Mark a specific notification as read
router.patch("/:notificationId/read", protect, markAsRead);

module.exports = router;
