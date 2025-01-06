const User = require("../models/user.models.js");
const bcrypt = require("bcryptjs");
const generateTokenAndSetCookie = require("../utils/generateToken.js");

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill in all fields" });
    }

    //   Check, what! email is already taken or not
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "Email Already Registered" });
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
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill in all fields" });
    }

    //   Check, email is registerd or not
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    // Compare password
    const comparePassword = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !comparePassword) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect Email or Password" });
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
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const logout = async (req, res) => {
  try {
    res.cookie("apna_store_jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: "Internal Server Error" });
  }
};

module.exports = { signup, login, logout };
