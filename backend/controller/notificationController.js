const {
  createNotification,
  getUserNotifications,
  markNotificationAsRead,
} = require("../service/notification.service");
const asyncHandler = require("../utils/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");

exports.getNotifications = asyncHandler(async (req, res) => {
  try {
    const notifications = await getUserNotifications(req.params.userId);
    res.status(200).json({ success: true, notifications });
  } catch (error) {
    console.log(error);
    return next(new ErrorResponse("Failed to fetch notifications", 500));
  }
});

exports.createNotification = asyncHandler(async (req, res) => {
  try {
    const { userId, title, message, type } = req.body;
    const notification = await createNotification({
      userId,
      title,
      message,
      type,
    });
    res.status(201).json({ success: true, notification });
  } catch (error) {
    return next(new ErrorResponse("Failed to create notifications", 500));
  }
});

exports.markNotificationAsRead = asyncHandler (async(req,res)=>{
    try {
        // const notification = await markNotificationAsRead
    } catch (error) {
        
    }
})