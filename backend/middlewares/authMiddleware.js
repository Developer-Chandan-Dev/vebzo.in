const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");

const protect = (req, res, next) => {
  const token = req.cookies.apna_store_jwt;
  
  if (!token) {
    return next(new ErrorResponse("Not authrorized , no token", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;

    next();
  } catch (error) {
    console.log(error);
    return next(new ErrorResponse("Not authrorized , token failed", 401));
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return next(new ErrorResponse("Not authorized as admin", 403));
  }
};

const checkRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access Denied" });
    }
    next();
  };
};

module.exports = { protect, admin, checkRole };
