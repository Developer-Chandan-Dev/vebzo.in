const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const http = require("http"); // Required for Socket.IO
const { Server } = require("socket.io"); // Import Socket.IO

const db = require("./config/db.js");
const errorHandler = require("./middlewares/errorHandler");

// <============== Route Imports ==============>
const authRoutes = require("./routes/authRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const productRoutes = require("./routes/productRoutes.js");
const categoryRoutes = require("./routes/categoryRoutes.js");
const orderRoutes = require("./routes/orderRoutes");
const cartRoutes = require("./routes/cartRoutes.js");
const wishlistRoutes = require("./routes/wishlistRoutes.js");
const productStockRoutes = require("./routes/productStockRoutes.js");
const analyticsRoutes = require("./routes/analyticsRoutes.js");
const reviewRoutes = require("./routes/reviewRoutes.js");
const notificationRoutes = require("./routes/notificationsRoutes.js");

const app = express();
const PORT = process.env.PORT || 8000;

// <============== Middleware ==============>
// Logger

app.use(morgan("dev"));
app.use(
  cors({
    origin: [process.env.CLIENT_URL, "http://localhost:3000"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply rate limiting to API routes only
// const globalLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
//   message: "Too many requests from this IP, please try again later",
// });
// app.use("/api", globalLimiter);

// Connect to database
db();

// Socket.IO setup
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:4000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

// Middleware to make io available in controllers
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Root Route
app.get("/", (req, res) => {
  res.send("Welcome on Home Page");
});
// Route Definitions
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/wishlist", wishlistRoutes);
app.use("/api/v1/stock", productStockRoutes);
app.use("/api/v1/analytics", analyticsRoutes);
app.use("/api/v1/reviews", reviewRoutes);
app.use("/api/v1/notifications", notificationRoutes);

// Error handling
app.use(errorHandler);

// Socket.IO event listeners
io.on("connection", (socket) => {
  console.log(`A user connected: ${socket.id}`);
  socket.on("sendNotification", (notification) => {
    console.log("Notification received:", notification);
    io.emit("receiveNotification", notification);
  });
  socket.on("disconnect", () => {
    console.log(`A user disconnected: ${socket.id}`);
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
