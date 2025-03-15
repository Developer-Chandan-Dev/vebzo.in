const asyncHandler = require("../utils/asyncHandler");
const Message = require("../models/message.model");
const ErrorResponse = require("../utils/errorResponse");

const addMessage = asyncHandler(async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !message) {
      return next(new ErrorResponse("Please fill required fields."))
    }

    const newMessage = new Message({ name, email, message })

    await newMessage.save();

    res.status(200).json({
      success: true,
      message: "Your message sended successfully"
    })

  } catch (error) {
    console.log(error);
    return next(new ErrorResponse("Failed to adding Message", 500))
  }
});

const getMessages = asyncHandler(async (req, res, next) => {
  try {
    const messages = await Message.find({});

    res.status(200).json({
      success: true,
      data: messages
    })
  } catch (error) {
    console.log(error);
    return next(new ErrorResponse("Failed to getting all messages"));
  }
});

const deleteMessage = asyncHandler(async (req, res, next) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);

    if (!message) {
      return next(new ErrorResponse("Message not found", 404))
    }

    res.status(200).json({ success: true, message: "Message deleted successfully" });
  } catch (error) {
    console.log(error);
    return next(new ErrorResponse("Failed to deleting a message", 500));
  }
})

module.exports = {
  addMessage, getMessages, deleteMessage
}