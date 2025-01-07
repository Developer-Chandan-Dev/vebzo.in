const Order = require("../models/order.model");
const Product = require("../models/product.model");
const asyncHandler = require("../utils/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");

// Total Sales Revenue
const getTotalSalesRevenue = asyncHandler(async (req, res, next) => {
  try {
    const result = await Order.aggregate([
      { $group: { _id: null, totalRevenue: { $sum: "$totalPrice" } } },
    ]);

    const totalRevenue = result[0]?.totalRevenue || 0;
    res.status(200).json({ success: true, totalRevenue: totalRevenue });
  } catch (error) {
    console.log(error);
    return next(new ErrorResponse("Internal Server Error", 500));
  }
});

// Numbers of Orders
const getTotalOrders = asyncHandler(async (req, res, next) => {
  try {
    const totalOrders = await Order.countDocuments();
    res.status(200).json({ success: true, totalOrders: totalOrders });
  } catch (error) {
    console.log(error);
    return next(new ErrorResponse("Internal Server Error", 500));
  }
});

// Top-Selling Products
const getTopSellingProducts = asyncHandler(async (req, res, next) => {
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
    return next(new ErrorResponse("Internal Server Error", 500));
  }
});

// Low Stock Products
const getLowStockProducts = asyncHandler(async (req, res, next) => {
  try {
    const threshold = 5; // Define low stock threshold
    const lowStockProducts = await Product.find({ stock: { $lte: threshold } });

    res.status(200).json({ success: true, lowStockProducts: lowStockProducts });
  } catch (error) {
    console.log(error);
    return next(new ErrorResponse("Internal Server Error", 500));
  }
});

// Sales Trends
const getSalesTrends = asyncHandler(async (req, res, next) => {
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
    return next(new ErrorResponse("Internal Server Error", 500));
  }
});

// Payment Method Insights
const getPaymentMethodInsights = asyncHandler(async (req, res, next) => {
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
    return next(new ErrorResponse("Internal Server Error", 500));
  }
});

// Customer Insights
const getCustomerInsights = asyncHandler(async (req, res, next) => {
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
    return next(new ErrorResponse("Internal Server Error", 500));
  }
});

// Retrieve Monthly Order Details
const getMonthlyOrderDetails = asyncHandler(async (req, res, next) => {
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
    return next(new ErrorResponse("Internal Server Error", 500));
  }
});

// Retrieve Weekly Order Details
const getWeeklyOrderDetails = asyncHandler(async (req, res, next) => {
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
    return next(new ErrorResponse("Internal Server Error", 500));
  }
});

// Retrieve Daily Order Details
const getDailyOrderDetails = asyncHandler(async (req, res, next) => {
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
    return next(new ErrorResponse("Internal Server Error", 500));
  }
});

// Filter Orders by Date Range
const getOrdersByDateRange = asyncHandler(async (req, res, next) => {
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
    return next(new ErrorResponse("Internal Server Error", 500));
  }
});

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
