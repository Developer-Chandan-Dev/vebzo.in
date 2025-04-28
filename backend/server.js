const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const morgan = require("morgan");
const http = require("http");

const db = require("./config/db");

// <===== Routes Import =====>
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cartRoutes = require("./routes/cartRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const productStockRoutes = require("./routes/productStockRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const notificationRoutes = require("./routes/notificationsRoutes");
const messagesRoutes = require("./routes/messageRoutes");
const errorHandler = require("./middlewares/errorHandler");
const initSocketServer = require("./server/socket.server.js"); // Socket server

const app = express();
const PORT = process.env.PORT || 8000;

// ✅ **Check .env is Loading**
console.log("Allowed Frontend URL:", process.env.CLIENT_URL);

// **Step 1: CORS Middleware (Sabse Pehle)**
app.use(
  cors({
    origin: [process.env.CLIENT_URL, "http://localhost:5173"],
    methods: "GET, POST, PUT, DELETE, OPTIONS",
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    credentials: true,
  })
);

// **Step 3: Middleware**
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: process.env.SECRET_KEY, resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

// ✅ **Check .env Working (Debugging Route)**
app.get("/test-env", (req, res) => {
  res.json({ CLIENT_URL: process.env.CLIENT_URL });
});

// ✅ **Database Connection**
db();


// **Step 4: Routes**
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
app.use("/api/v1/contact-messages", messagesRoutes);

app.use(errorHandler); // Error handler should be at the end



// **Step 5: Socket.io Setup**
const server = http.createServer(app);

// Initialize Socket.IO server
initSocketServer(server);

// **Step 6: Start Server**
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
