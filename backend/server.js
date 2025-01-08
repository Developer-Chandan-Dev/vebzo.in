const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 8000;

// <============== Middleware ==============>
// Logger
app.use(morgan("dev"));

// CORS configuration
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);

// Parsers
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Global Rate Limiter
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later",
});
app.use(globalLimiter);

// <============== File Imports ==============>
const db = require("./config/db.js");
const errorHandler = require("./middlewares/errorHandler");
const authRoutes = require("./routes/authRoutes.js");
const productRoutes = require("./routes/productRoutes.js");
const categoryRoutes = require("./routes/categoryRoutes.js");
const orderRoutes = require("./routes/orderRoutes");
const cartRoutes = require("./routes/cartRoutes.js");
const wishlistRoutes = require("./routes/wishlistRoutes.js");
const productStockRoutes = require("./routes/productStockRoutes.js");
const analyticsRoutes = require("./routes/analyticsRoutes.js");
const reviewRoutes = require("./routes/reviewRoutes.js");

// Error handling middleware (should be after routes)
app.use(errorHandler);
// <============== Routes ==============>
// Root Route
app.get("/", (req, res) => {
  res.send("Home Page");
});

// Route Definitions
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/wishlist", wishlistRoutes);
app.use("/api/v1/stock", productStockRoutes);
app.use("/api/v1/analytics", analyticsRoutes);
app.use("/api/v1/reviews", reviewRoutes);

// Error Handler Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
