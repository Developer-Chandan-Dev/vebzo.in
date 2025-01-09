const Notification = require("../models/notification.models");
const asyncHandler = require("../utils/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");

// Create a new notification
exports.createNotification = asyncHandler(async (req, res, next) => {
  try {
    const { user, title, message, type } = req.body;

    const notification = await Notification.create({
      user,
      title,
      message,
      type,
    });

    // Emit the notification in real-time using Socket.io
    req.io.emit(`notification:${user}`, notification);

    res.status(201).json({
      success: true,
      notification,
      message: "Notification created successfully",
    });
  } catch (error) {
    console.log(error);
    return next(new ErrorResponse("Failed to create notification", 500));
  }
});

// Fetch all notifications for a user
exports.getUserNotifications = asyncHandler(async (req, res, next) => {
  try {
    const { userId } = req.params;

    const notifications = await Notification.find({ user: userId })
      .sort({ createdAt: -1 }) // Sort by latest
      .exec();

    res.status(200).json({
      success: true,
      notifications,
    });
  } catch (error) {
    console.log(error);
    return next(new ErrorResponse("Failed to fetch notification", 500));
  }
});

// Mark a notification as read
exports.markAsRead = asyncHandler(async (req, res, next) => {
  try {
    const { notificationId } = req.params;

    const notification = await Notification.findByIdAndUpdate(
      notificationId,
      { read: true },
      { new: true }
    );

    if (!notification) {
      return next(new ErrorResponse("Notification not found", 404));
    }

    res.status(200).json({
      success: true,
      notification,
      message: "Notification marked as read",
    });
  } catch (error) {
    console.log(error);
    return next(new ErrorResponse("Failed to create notification", 500));
  }
});
