const Notification = require("../models/notification.models");
const asyncHandler = require("../utils/asyncHandler");

const createNotification = asyncHandler(
  async ({ userId, title, message, type }) => {
    const notification = new Notification({
      user: userId,
      title,
      message,
      type,
    });

    await notification.save();
    return notification;
  }
);

const getUserNotifications = asyncHandler(async (userId) => {
  return await Notification.find({ user: userId }).sort({ createdAt: -1 });
});

const markNotificationAsRead = asyncHandler(async (notificationId) => {
  return await Notification.findByIdAndUpdate(notificationId, { read: true });
});

module.exports = {
  createNotification,
  getUserNotifications,
  markNotificationAsRead,
};
