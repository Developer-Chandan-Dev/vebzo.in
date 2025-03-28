const jwt = require("jsonwebtoken");

const generateTokenAndSetCookie = (userId, userRole, res) => {
  const token = jwt.sign(
    { id: userId, role: userRole },
    process.env.SECRET_KEY,
    { expiresIn: "7d" }
  );
  
  res.cookie("apna_store_jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,  // ✅ Prevents JavaScript access for security
    secure: true, // ✅ Required for HTTPS (deployment)
    sameSite: "None", // ✅ Required for cross-site cookies
  });  

};

module.exports = generateTokenAndSetCookie;
