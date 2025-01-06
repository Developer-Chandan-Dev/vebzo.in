const Order = require("../models/order.model");
const Product = require("../models/product.model");

// Total Sales Revenue
const getTotalSalesRevenue = async (req, res) => {
  try {
    const result = await Order.aggregate([
      { $group: { _id: null, totalRevenue: { $sum: "$totalPrice" } } },
    ]);

    const totalRevenue = result[0]?.totalRevenue || 0;
    res.status(200).json({ success: true, totalRevenue: totalRevenue });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Numbers of Orders
const getTotalOrders = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    res.status(200).json({ success: true, totalOrders: totalOrders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Top-Selling Products
const getTopSellingProducts = async (req, res) => {
  try {
    const result = await Order.aggregate([
      { $unwind: "$orderItems" },
      {
        $group: {
          _id: "$orderItems.product",
          totalSold: { $sum: "$orderItems.quantity" },
        },
      },
      { $sort: { totalSold: -1 } },
      { $limit: 5 }, // Top 5 products
      {
        $lookup: {
          from: "products", // Product collection
          localField: "_id",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      { $unwind: "$productDetails" },
      { $project: { totalSold: 1, productDetails: { name: 1, price: 1 } } },
    ]);

    res.status(200).json({ success: true, result: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Low Stock Products
const getLowStockProducts = async (req, res) => {
  try {
    const threshold = 5; // Define low stock threshold
    const lowStockProducts = await Product.find({ stock: { $lte: threshold } });

    res.status(200).json({ success: true, lowStockProducts: lowStockProducts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Sales Trends
const getSalesTrends = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const result = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          totalRevenue: { $sum: "$totalPrice" },
          totalOrders: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.status(200).json({ success: true, result: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Payment Method Insights
const getPaymentMethodInsights = async (req, res) => {
  try {
    const result = await Order.aggregate([
      {
        $group: {
          _id: "$paymentMethod",
          count: { $sum: 1 },
          totalAmount: { $sum: "$totalPrice" },
        },
      },
    ]);

    res.status(200).json({ success: true, result: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Customer Insights
const getCustomerInsights = async (req, res) => {
  try {
    const result = await Order.aggregate([
      {
        $group: {
          _id: "$user",
          totalOrders: { $sum: 1 },
          totalSpent: { $sum: "$totalPrice" },
        },
      },
      {
        $lookup: {
          from: "users", // User collection
          localField: "_id",
          foreignField: "_id",
          as: "usreDetails",
        },
      },
      { $unwind: "$userDetails" },
      {
        $project: {
          totalOrders: 1,
          totalSpent: 1,
          userDetails: { username: 1, email: 1 },
        },
      },
    ]);

    res.status(200).json({ success: true, result: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Retrieve Monthly Order Details
const getMonthlyOrderDetails = async (req, res) => {
  try {
    const result = await Order.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } }, // Group by Year-Month
          totalOrders: { $sum: 1 }, // Count orders
          totalSales: { $sum: "$totalPrice" }, // Sum sales
        },
      },
      { $sort: { _id: 1 } }, //sort by month
    ]);

    res.status(200).json({ success: true, result: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Retrieve Weekly Order Details
const getWeeklyOrderDetails = async (req, res) => {
  try {
    const result = await Order.aggregate([
      {
        $group: {
          _id: {
            week: { $isoWeek: "$createdAt" }, // ISO week number
            year: { $isoWeekYear: "$createdAt" }, // Year of the ISO week
          },
          totalOrders: { $sum: 1 }, // Count orders
          totalSales: { $sum: "$totalPrice" }, // Sum sales
        },
      },
      { $sort: { "_id.year": 1, "_id.week": 1 } }, //sort by month
    ]);

    res.status(200).json({ success: true, result: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Retrieve Daily Order Details
const getDailyOrderDetails = async (req, res) => {
  try {
    const result = await Order.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, // Group by Year-Month-Day
          totalOrders: { $sum: 1 },
          totalSales: { $sum: "$totalPrice" },
        },
      },
      { $sort: { _id: 1 } }, // Sort by day
    ]);

    res.status(200).json({ success: true, result: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Filter Orders by Date Range
const getOrdersByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const result = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(startDate), // Start date
            $lte: new Date(endDate), // End date
          },
        },
      },
      {
        $group: {
          _id: null, // No grouping field needed
          totalOrders: { $sum: 1 },
          totalSales: { $sum: "$totalPrice" },
        },
      },
    ]);
    res.status(200).json({ success: true, result: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  getTotalSalesRevenue,
  getTotalOrders,
  getTopSellingProducts,
  getLowStockProducts,
  getSalesTrends,
  getPaymentMethodInsights,
  getCustomerInsights,
  getMonthlyOrderDetails,
  getWeeklyOrderDetails,
  getDailyOrderDetails,
  getOrdersByDateRange,
};
