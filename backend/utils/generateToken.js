const jwt = require("jsonwebtoken");

const generateTokenAndSetCookie = (userId, userRole, res) => {
  console.log(userId, userRole);
  const token = jwt.sign(
    { id: userId, role: userRole },
    process.env.SECRET_KEY,
    { expiresIn: "7d" }
  );
  
  res.cookie("apna_store_jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true, // prevent XSS attact / cross-site scripting attacks
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "production",
  });
};

module.exports = generateTokenAndSetCookie;
