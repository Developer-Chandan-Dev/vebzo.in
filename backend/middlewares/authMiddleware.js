const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  const token = req.cookies.apna_store_jwt;

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .json({ success: false, message: "Not authorized, token failed" });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res
      .status(403)
      .json({ success: false, message: "Not authorized as admin" });
  }
};

module.exports = { protect, admin };
