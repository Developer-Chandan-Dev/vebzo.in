const User = require("../models/user.models.js");
const bcrypt = require("bcryptjs");
const generateTokenAndSetCookie = require("../utils/generateToken.js");
const asyncHandler = require("../utils/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");

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
    if (user.blocked) {
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
    res.status(200).json({ message: "Logged out Successfully" });
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
    const userId = req.params.id;

    // Find and update the user
    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    });
    if (!updatedUser) {
      return next(new ErrorResponse("User not found", 404));
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

module.exports = { signup, login, logout, me, updateProfile };
