const Order = require("../models/order.model");
const Product = require("../models/product.model");
const User = require("../models/user.models");
const asyncHandler = require("../utils/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");

// <========= Sales & Revenue ============>
/**
 * Get total sales, revenue, and average order value for a specified period
 * @route GET /api/v1/analytics/total-sales
 * @query {startDate, endDate} - Optional: Filter data for a specific period
 */
const getTotalSales = asyncHandler(async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;

    // Filter for a specific period if provided
    const filter = {};
    if (startDate && endDate) {
      filter.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }
    // Fetch all orders in the given period (delivered orders only)
    const orders = await Order.find({ ...filter, status: "Delivered" });

    if (orders.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No sales data found for the specified period.",
        data: {
          totalSales: 0,
          totalRevenue: 0,
          averageOrderValue: 0,
        },
      });
    }

    // Calculate metrics
    const totalSales = orders.length; // Number of completed orders
    const totalRevenue = orders.reduce(
      (sum, order) => sum + order.totalPrice,
      0
    ); // Total revenue
    const averageOrderValue = (totalRevenue / totalSales).toFixed(2); // Average order value

    // Respond with the data
    res.status(200).json({
      success: true,
      message: "Sales data fetched successfully.",
      data: {
        totalSales,
        totalRevenue,
        averageOrderValue,
      },
    });
  } catch (error) {
    console.error("Error fetching sales data:", error);
    return next(new ErrorResponse("Failed to fetch sales data.", 500));
  }
});

/**
 * Get sales data grouped by day, week, or month
 * @route GET /api/v1/analytics/sales-by-date
 * @query {period} - "day", "week", or "month" (default: "day")
 * @query {startDate} - Start date for the analysis (optional)
 * @query {endDate} - End date for the analysis (optional)
 * @example - GET /api/v1/analytics/sales-by-date?period=day&startDate=2025-01-01&endDate=2025-01-10 (?period=day/week/month)
 */
const getSalesByDate = asyncHandler(async (req, res, next) => {
  try {
    const { period = "day", startDate, endDate } = req.query;

    // Define date range filter
    const dateFilter = {};
    if (startDate) dateFilter.$gte = new Date(startDate);
    if (endDate) dateFilter.$lte = new Date(endDate);

    // Match orders based on status and date range
    const matchStage = {
      status: "Delivered", // Only include delivered orders
    };
    if (Object.keys(dateFilter).length > 0) {
      matchStage.createdAt = dateFilter;
    }

    // Grouping field based on the period
    let groupField;
    switch (period) {
      case "week":
        groupField = { $week: "$createdAt" }; // Group by week
        break;
      case "month":
        groupField = { $month: "$createdAt" }; // Group by month
        break;
      case "day":
      default:
        groupField = {
          $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
        }; // Group by day
        break;
    }

    // Aggregate sales data
    const salesData = await Order.aggregate([
      {
        $match: matchStage, // Filter orders
      },
      {
        $group: {
          _id: groupField, // Group by the specified period
          totalSales: { $sum: 1 }, // Count orders
          totalRevenue: { $sum: "$totalPrice" }, // Sum total revenue
        },
      },
      {
        $sort: { _id: 1 }, // Sort by date
      },
    ]);

    // Format the response data
    const formattedData = salesData.map((data) => ({
      date: data._id,
      totalSales: data.totalSales,
      totalRevenue: data.totalRevenue,
    }));

    // Respond with data
    res.status(200).json({
      success: true,
      message: `Sales data grouped by ${period} fetched successfully.`,
      data: formattedData,
    });
  } catch (error) {
    console.error("Error fetching sales data:", error);
    return next(new ErrorResponse("Failed to fetch sales data.", 500));
  }
});

/**
 * Get top customers based on total purchase value or order frequency
 * @route GET /api/v1/analytics/top-customers
 * @query {type} - "value" (default) or "frequency"
 * @query {limit} - Number of top customers to fetch (default: 5)
 * @query {startDate} - Start date for analysis (optional)
 * @query {endDate} - End date for analysis (optional)
 */
const getTopCustomers = asyncHandler(async (req, res, next) => {
  try {
    const { type = "value", limit = 5, startDate, endDate } = req.query;

    // Define date range filter
    const dateFilter = {};
    if (startDate) dateFilter.$gte = new Date(startDate);
    if (endDate) dateFilter.$lte = new Date(endDate);

    // Match stage for filtering delivered orders and date range
    const matchStage = { status: "Delivered" };
    if (Object.keys(dateFilter).length > 0) {
      matchStage.createdAt = dateFilter;
    }

    // Group and sort based on the type
    const sortField = type === "frequency" ? "orderCount" : "totalSpent";
    const groupStage = {
      _id: "$userId", // Group by user ID (assumes `userId` exists in the orders schema)
      orderCount: { $sum: 1 }, // Count number of orders
      totalSpent: { $sum: "$totalPrice" }, // Sum total purchase value
    };

    const topCustomers = await Order.aggregate([
      {
        $match: matchStage, // Filter orders
      },
      {
        $group: groupStage, // Group by user
      },
      {
        $sort: { [sortField]: -1 }, // Sort by order frequency or purchase value
      },
      {
        $limit: parseInt(limit), // Limit the number of users
      },
      {
        $lookup: {
          from: "users", // Assuming your users collection is named "users"
          localField: "_id",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $unwind: "$userDetails", // Unwind user details
      },
      {
        $project: {
          _id: 0,
          userId: "$_id",
          name: "$userDetails.username",
          email: "$userDetails.email",
          orderCount: 1,
          totalSpent: 1,
        },
      },
    ]);

    // Respond with data
    res.status(200).json({
      success: true,
      message: `Top customers based on ${type} fetched successfully.`,
      data: topCustomers,
    });
  } catch (error) {
    console.error("Error fetching top customers:", error);
    return next(new ErrorResponse("Failed to fetch top customers.", 500));
  }
});

/**
 * Get revenue by product category
 * @route GET /api/v1/analytics/revenue-by-category
 * @query {startDate} - Start date for analysis (optional)
 * @query {endDate} - End date for analysis (optional)
 */
const getRevenueByCategory = asyncHandler(async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;

    // Define date range filter
    const dateFilter = {};
    if (startDate) dateFilter.$gte = new Date(startDate);
    if (endDate) dateFilter.$lte = new Date(endDate);

    // Match stage for filtering Delivered orders and date range
    const matchStage = { status: "Delivered" }; // Only consider delivered orders
    if (Object.keys(dateFilter).length > 0) {
      matchStage.createdAt = dateFilter;
    }

    // Aggregate pipeline for calculating revenue by category
    const revenueByCategory = await Order.aggregate([
      {
        $match: matchStage, // Filter orders by status and date range
      },
      {
        $unwind: "$orderItems", // Unwind orderItems array to process each item separately
      },
      {
        $lookup: {
          from: "products", // Join with Product collection
          localField: "orderItems.product", // Reference product field in orderItems
          foreignField: "_id", // Match with _id field in Product collection
          as: "productDetails", // Alias for the joined data
        },
      },
      {
        $unwind: "$productDetails", // Unwind productDetails array for easy access
      },
      {
        $lookup: {
          from: "categories", // Join with Category collection
          localField: "productDetails.category", // Reference category in Product collection
          foreignField: "_id", // Match with _id field in Category collection
          as: "categoryDetails", // Alias for the joined data
        },
      },
      {
        $unwind: "$categoryDetails", // Unwind categoryDetails array for easy access
      },
      {
        $group: {
          _id: "$categoryDetails._id", // Group by category ID
          categoryName: { $first: "$categoryDetails.name" }, // Get the category name
          totalRevenue: {
            $sum: { $multiply: ["$orderItems.price", "$orderItems.quantity"] },
          }, // Calculate total revenue
          totalItemsSold: { $sum: "$orderItems.quantity" }, // Count total items sold
        },
      },
      {
        $sort: { totalRevenue: -1 }, // Sort categories by total revenue in descending order
      },
      {
        $project: {
          _id: 0,
          categoryId: "$_id", // Rename _id to categoryId
          categoryName: 1, // Include category name
          totalRevenue: 1,
          totalItemsSold: 1,
        },
      },
    ]);

    // Respond with the calculated data
    res.status(200).json({
      success: true,
      message: "Revenue by category fetched successfully.",
      data: revenueByCategory,
    });
  } catch (error) {
    console.error("Error fetching revenue by category:", error);
    return next(new ErrorResponse("Failed to fetch revenue by category.", 500));
  }
});

// <=============  Product & Inventory Analytics =============>

/**
 * Get top-selling products
 * @route GET /api/v1/analytics/top-selling-products
 * @query {limit} - Limit the number of top products (optional, default: 10)
 * @query {startDate} - Start date for analysis (optional)
 * @query {endDate} - End date for analysis (optional)
 */
const getTopSellingProducts = asyncHandler(async (req, res, next) => {
  try {
    const { startDate, endDate, limit } = req.query;

    // Parse date strings into JavaScript Date objects
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    // Build date filter only if startDate and/or endDate are provided
    const dateFilter = {};
    if (start) dateFilter.$gte = start;
    if (end) dateFilter.$lte = end;

    const topProducts = await Order.aggregate([
      {
        $match: {
          ...(start || end ? { createdAt: dateFilter } : {}), // Filter orders by date range
        },
      },
      {
        $unwind: "$orderItems", // Unwind the orderItems array to process each product separately
      },
      {
        $group: {
          _id: "$orderItems.product", // Group by product ID
          totalQuantity: { $sum: "$orderItems.quantity" }, // Sum up the quantities sold
          totalRevenue: {
            $sum: { $multiply: ["$orderItems.quantity", "$orderItems.price"] },
          }, // Calculate total revenue
        },
      },
      {
        $lookup: {
          from: "products", // Reference the Product collection
          localField: "_id",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      {
        $unwind: "$productDetails", // Unwind product details for easier access
      },
      {
        $sort: { totalQuantity: -1 }, // Sort by total quantity in descending order
      },
      {
        $limit: parseInt(limit) || 5, // Limit the results to the top N products
      },
      {
        $project: {
          _id: 0,
          productId: "$_id",
          productName: "$productDetails.name",
          totalQuantity: 1,
          totalRevenue: 1,
        },
      },
    ]);

    // Respond with the top-selling products
    res.status(200).json({
      success: true,
      message: "Top-selling products fetched successfully.",
      data: topProducts,
    });
  } catch (error) {
    console.error("Error fetching top-selling products:", error);
    return next(
      new ErrorResponse("Failed to fetch top-selling products.", 500)
    );
  }
});

// <============== User Analytics ================>

/** Track the growth in the number of registered users over time.
 * @route GET /api/v1/analytics/users-growth
 * @query {period} - "day", "week", or "month" (default: "day")
 * @query {startDate} - Start date for te analysis (optional)
 * @query {endDate} - End date for te analysis (optional)
 * @example - GET /api/v1/analytics/users-growth?period=day&startDate=2025-01-01&endDate=2025-01-10 (?period=day/week/month)
 */
const getUserGrowth = asyncHandler(async (req, res, next) => {
  try {
    const { period = "day", startDate, endDate } = req.query;

    // Validate period
    if (!["day", "week", "month"].includes(period)) {
      return next(new ErrorResponse("Invalid period value. Use 'day', 'week', or 'month'.", 400));
    }

    // Define date range filter
    const dateFilter = {};
    if (startDate) dateFilter.$gte = new Date(startDate);
    if (endDate) dateFilter.$lte = new Date(endDate);
    if (Object.keys(dateFilter).length === 0) {
      const today = new Date();
      dateFilter.$gte = new Date(today.setDate(today.getDate() - 30)); // Default: last 30 days
      dateFilter.$lte = new Date();
    }

    // Match stage for filtering users
    const matchStage = {};
    if (Object.keys(dateFilter).length > 0) {
      matchStage.createdAt = dateFilter;
    }

    // Grouping field based on the period
    let groupField;
    switch (period) {
      case "week":
        groupField = { $week: "$createdAt" };
        break;
      case "month":
        groupField = { $month: "$createdAt" };
        break;
      case "day":
      default:
        groupField = {
          $dateToString: { format: "%Y-%m-%d", date: "$createdAt", timezone: "Asia/Kolkata" },
        };
        break;
    }

    // Aggregate user growth data
    const userGrowData = await User.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: groupField,
          totalUsers: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Format the response data
    const formattedData = userGrowData.map((data) => ({
      date: data._id,
      totalUsers: data.totalUsers,
    }));

    // Handle empty results
    if (formattedData.length === 0) {
      return res.status(200).json({
        success: true,
        message: `No users found for the selected period.`,
        data: [],
      });
    }

    // Respond with data
    res.status(200).json({
      success: true,
      message: `Users growth data grouped by ${period} fetched successfully`,
      data: formattedData,
    });
  } catch (error) {
    console.error(error);
    return next(new ErrorResponse("Failed to fetch Users growth", 500));
  }
});


// <============= Order & Cart Analytics ================>

/** Fetch the count of orders grouped by their statuses (e.g., pending, delivered, canceled).
 * @route GET /api/v1/analytics/order-status
 */
const getOrderStatusCounts = asyncHandler(async (req, res, next) => {
  try {
    // Aggregate pipeline to group by status and count orders
    const statusCounts = await Order.aggregate([
      {
        $group: {
          _id: "$status", // Group by the "status" field
          count: { $sum: 1 }, // Count the number of orders for each status
        },
      },
    ]);

    // Transform the result into an object for easier access
    const statusCountMap = statusCounts.reduce((acc, item) => {
      acc[item._id.toLowerCase()] = item.count; // Convert the status to lowercase for consistency
      return acc;
    }, {});

    res.status(200).json({
      success: true,
      message: "Order status counts fetched successfully.",
      statusCounts: {
        pending: statusCountMap.pending || 0,
        confirmed: statusCountMap.confirmed || 0,
        ofd: statusCountMap["out for delivery"] || 0,
        delivered: statusCountMap.delivered || 0,
        cancelled: statusCountMap.cancelled || 0,
      },
    });
  } catch (error) {
    console.error("Error fetching order status counts:", error);
    return next(new ErrorResponse("Failed to fetch order status counts.", 500));
  }
});

/** Track the number of orders placed daily, weekly, or monthly.
 * @route GET /api/v1/analytics/order-trends
 * @query {period} - "day", "week", or "month" (default: "day")
 * @query {startDate} - Start date for the analysis (optional)
 * @query endDate - End date for the analysis (optional)
 * @example - GET /api/v1/analytics/sales-trends?period=day&startDate=2025-01-01&endDate=2025-01-10 (?period=day/week/month)
 */
const getOrderTrends = asyncHandler(async (req, res, next) => {
  try {
    const { period = "day", startDate, endDate } = req.query;

    // Define date range filter
    const dateFilter = {};
    if (startDate) dateFilter.$gte = new Date(startDate);
    if (endDate) dateFilter.$lte = new Date(endDate);

    // Match order based on date range
    const matchStage = {};
    if (Object.keys(dateFilter).length > 0) {
      matchStage.createdAt = dateFilter;
    }
    // Grouping field based on the period
    let groupField;
    switch (period) {
      case "week":
        groupField = { $week: "$createdAt" }; // Group by week
        break;
      case "month":
        groupField = { $month: "createdAt" }; // Group by month
        break;
      case "day":
      default:
        groupField = {
          $dateToString: { format: "%Y0-%m-%d", date: "$createdAt" },
        }; // Group by day
        break;
    }

    // Aggregate orders data
    const ordersData = await Order.aggregate([
      {
        $match: matchStage, // Filter orders
      },
      {
        $group: {
          _id: groupField, // Group by the specified period
          totalOrders: { $sum: 1 }, // Counts orders
        },
      },
      {
        $sort: { _id: 1 }, // Sort by date
      },
    ]);

    // Format the response data
    const formattedData = ordersData.map((data) => ({
      date: data._id,
      totalOrders: data.totalOrders,
    }));

    // Respond with data
    res.status(200).json({
      success: true,
      message: `Orders counts group by ${period} fetched successfully`,
      data: formattedData,
    });
  } catch (error) {
    console.error("Error fetching order trends:", error);
    return next(new ErrorResponse("Failed to fetch order trends.", 500));
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

// // Top-Selling Products
// const getTopSellingProducts = asyncHandler(async (req, res, next) => {
//   try {
//     const result = await Order.aggregate([
//       { $unwind: "$orderItems" },
//       {
//         $group: {
//           _id: "$orderItems.product",
//           totalSold: { $sum: "$orderItems.quantity" },
//         },
//       },
//       { $sort: { totalSold: -1 } },
//       { $limit: 5 }, // Top 5 products
//       {
//         $lookup: {
//           from: "products", // Product collection
//           localField: "_id",
//           foreignField: "_id",
//           as: "productDetails",
//         },
//       },
//       { $unwind: "$productDetails" },
//       { $project: { totalSold: 1, productDetails: { name: 1, price: 1 } } },
//     ]);

//     res.status(200).json({ success: true, result: result });
//   } catch (error) {
//     console.log(error);
//     return next(new ErrorResponse("Internal Server Error", 500));
//   }
// });

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
  // getTotalSalesRevenue,
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

  getTotalSales,
  getSalesByDate,
  getTopCustomers,
  getRevenueByCategory,

  getUserGrowth,

  getOrderStatusCounts,
  getOrderTrends,
};
