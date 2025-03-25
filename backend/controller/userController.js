const asyncHandler = require("../utils/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/user.models.js");

const getAllUsers = asyncHandler(async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const { query, role, isBlocked, createdAt } = req.query;

    const filters = {};

    if (query) {
      filters.$or = [
        { username: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
        { address: { $regex: query, $options: "i" } },
        { phone: { $regex: query, $options: "i" } },
      ];
    }

    if (role) filters.role = { ...filters.role, $eq: role };
    if (isBlocked) filters.isBlocked = { ...filters.isBlocked, $eq: isBlocked };
    if (createdAt) filters.createdAt = { ...filters.createdAt, $eq: createdAt };
    

    const totalUsers = await User.countDocuments(filters);
    const totalPages = Math.ceil(totalUsers / limit);

    // Fetch paginated and filtered data
    const users = await User.find(filters)
      .select("-password")
      .skip((page - 1) * limit)
      .limit(limit).sort({ createdAt: -1 }); // Sort by latest

    res
      .status(200)
      .json({ success: true, data: users, totalPages, totalUsers });
  } catch (error) {
    console.log(error);
    return next(new ErrorResponse("Internal Server Error", 500));
  }
});

const updateUserByAdmin = asyncHandler(async (req, res, next) => {
  try {
    const { id: userId } = req.params; // ID of the user to be updated
    const updates = req.body; // Fields to be updated

    // Ensure the admin is making the request
    if (req.user.role !== "admin") {
      return next(
        new ErrorResponse("You are not authorized to perform this action", 403)
      );
    }

    // Whitelist of fields that admin can update
    const allowedUpdates = ["role", "isBlocked"];
    const filteredUpdates = Object.keys(updates).reduce((obj, key) => {
      if (allowedUpdates.includes(key)) obj[key] = updates[key];
      return obj;
    }, {});

    if (Object.keys(filteredUpdates).length === 0) {
      return next(new ErrorResponse("No valid fields to update", 400));
    }

    // Find and update the user
    const updatedUser = await User.findByIdAndUpdate(userId, filteredUpdates, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!updatedUser) {
      return next(new ErrorResponse("User not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "User details updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    return next(new ErrorResponse("Internal Server Error", 500));
  }
});

const deleteUserByAdmin = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(new ErrorResponse("User not found", 404));
    }

    await User.findByIdAndDelete(req.params.id);

    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    return next(new ErrorResponse("Failed to delete User", 403));
  }
});

module.exports = { getAllUsers, updateUserByAdmin, deleteUserByAdmin };
