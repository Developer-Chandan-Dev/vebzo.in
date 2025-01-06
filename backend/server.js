const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const app = express();

const PORT = process.env.PORT || 8000;

// Useing Parsers
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Body parser middleware for parsing application/x-www-form-urlencoded

// <============== File imports ===============>
const db = require("./config/db.js");
const authRoutes = require("./routes/authRoutes.js");
const productRoutes = require("./routes/productRoutes.js");
const categoryRoutes = require("./routes/categoryRoutes.js");
const orderRoutes = require("./routes/orderRoutes");
const cartRoutes = require("./routes/cartRoutes.js");
const wishlistRoutes = require("./routes/wishlistRoutes.js");
const productStockRoutes = require("./routes/productStockRoutes.js");
const analyticsRoutes = require("./routes/analyticsRoutes.js");

app.get("/", (req, res) => {
  res.send("Home Page");
});

// <============= Routes (User Routes) =============>
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/orders", orderRoutes); // Add order routes
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/wishlist", wishlistRoutes);
app.use("/api/v1/stock", productStockRoutes);
app.use("/api/v1/analytics", analyticsRoutes);

// <============= Routes (Admin Dashboard Routes) =============>

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
