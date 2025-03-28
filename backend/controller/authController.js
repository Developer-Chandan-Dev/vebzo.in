const User = require("../models/user.models.js");
const bcrypt = require("bcryptjs");
const generateTokenAndSetCookie = require("../utils/generateToken.js");
const asyncHandler = require("../utils/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");
const { handleImageUpload } = require("../helper/cloudinary.helper.js");

// Google Auth Success
const googleAuth = (req, res) => {
  console.log(req.user);
  // const token = generateTokenAndSetCookie(req.user);
}


const signup = asyncHandler(async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return next(new ErrorResponse("Please fill in all fields", 400));
    }

    //   Check, what! email is already taken or not
    const user = await User.findOne({ email });
    if (user) {
      return next(new ErrorResponse("Email Already Registerd", 400));
    }

    //   Creating new User
    const newUser = new User({ username, email, password });

    //   check new user is create or not
    if (newUser) {
      const response = await newUser.save();
      res.status(201).json({
        success: true,
        user: {
          _id: response._id,
          username: response.username,
          email: response.username,
        },
        message: "User Registered Successfully",
      });
    } else {
      return res.status(400).json({ success: false, message: "Invalid User" });
    }
  } catch (error) {
    console.error(error);
    return next(new ErrorResponse("Internal Server Error", 500));
  }
});

const login = asyncHandler(async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorResponse("Please fill in all fields", 400));
    }

    //   Check, email is registerd or not
    const user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorResponse("User not found", 400));
    }
    // Compare password
    const comparePassword = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !comparePassword) {
      return next(new ErrorResponse("Incorrect Email or Password", 400));
    }

    // Check if the user is blocked
    if (user.isBlocked) {
      return res
        .status(403)
        .json({ message: "Your account is blocked. Please contact support." });
    }
    // Generate Token and set cookie
    generateTokenAndSetCookie(user._id, user.role, res); // Generate token and set cookie

    res.status(200).json({
      success: true,
      message: "Login Successfully",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        imageUrl: user?.imageUrl,
      },
    });
  } catch (error) {
    console.error(error);
    return next(new ErrorResponse("Internal Server Error", 500));
  }
});

const logout = asyncHandler(async (req, res, next) => {
  try {
    res.cookie("apna_store_jwt", "", { maxAge: 0 });
    res.status(200).json({ success: true, message: "Logged out Successfully" });
  } catch (error) {
    console.error(error);
    return next(new ErrorResponse("Internal Server Error", 500));
  }
});

const me = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return next(new ErrorResponse("User not found", 404));
    }
    res.status(200).json({ success: true, user: user });
  } catch (error) {
    console.log(error);
    return next(new ErrorResponse("Internal Server Error", 500));
  }
});

const updateProfile = asyncHandler(async (req, res, next) => {
  try {
    const updates = req.body;
    const userId = req.params.id; // ID from the route parameter
    const loggedInUserId = req.user.id; // Logged-in user ID from authentication middleware
    const newImagePath = req.file?.path; // Path of the uploaded image
    
    // Ensure the logged-in user can only update their own profile
    if (userId !== loggedInUserId) {
      return next(
        new ErrorResponse("You are not authorized to update this user", 403)
      );
    }

    // Whitelist of fields that can be updated
    const allowedUpdates = ["username", "email", "address", "phone"];
    const filteredUpdates = Object.keys(updates).reduce((obj, key) => {
      if (allowedUpdates.includes(key)) obj[key] = updates[key];
      return obj;
    }, {});

    // Find the existing product by ID
    const user = await User.findById(userId);
    if (!user) {
      return next(new ErrorResponse("User not found", 404));
    }

    // Handle image upload if a new image is provided
    let updatedImage = {};
    if (newImagePath) {
      const folderName = "users"; // Specify the folder name for image uploads
      updatedImage = await handleImageUpload(
        user,
        newImagePath,
        updates.username || user.username, // Use the new username if provided; otherwise, use the existing one
        folderName
      );
    }

    // Merge the filtered updates and image updates
    const updatePayload = {
      ...filteredUpdates,
      ...(updatedImage.imageUrl && { imageUrl: updatedImage.imageUrl }),
      ...(updatedImage.imageUrlPublicId && {
        imageUrlPublicId: updatedImage.imageUrlPublicId,
      }),
    };

    // Update the user in the database
    const updatedUser = await User.findByIdAndUpdate(userId, updatePayload, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!updatedUser) {
      return next(new ErrorResponse("Failed to update user", 400));
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });
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

const updatePassword = asyncHandler(async (req, res, next) => {
  const { id: userId } = req.params; // ID of the user to be updated
  const { oldPassword, newPassword, confirmPassword } = req.body;
  
  try {

    if (userId !== req.user.id) {
      return next(new ErrorResponse("Not Authorized", 403));
    }

    // Check if all required fields are provided
    if (!oldPassword || !newPassword || !confirmPassword) {
      return next(new ErrorResponse("All fields are required", 400));
    }

    // Check newPassword and confirmPassword are same or not
    if (newPassword !== confirmPassword) {
      return next(
        new ErrorResponse("New and confirm password are not same. ", 400)
      );
    }

    // Find the user by username and email
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return next(new ErrorResponse("Invalid username or email", 404));
    }

    // Check if the old password matches
    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) {
      return next(new ErrorResponse("Old password is incorrect", 401));
    }
    
    // Update the password (no manual hashing required, pre-save will handle it)
    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error(error);
    return next(new ErrorResponse("Internal Server Error", 500));
  }
});

module.exports = {
  googleAuth,
  signup,
  login,
  logout,
  me,
  updateProfile,
  updateUserByAdmin,
  updatePassword,
};
