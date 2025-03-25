const Order = require("../models/order.model");
const User = require("../models/user.models")
const Product = require("../models/product.model");
const asyncHandler = require("../utils/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");

// <============== Sales & Revenue charts =============>

/**
 * Get monthly sales, revenue, and average order value
 * @route GET /api/v1/analytics/monthly-sales
 * @query {year} - Optional: Filter data for a specific year
 */
const getSalesOverview = asyncHandler(async (req, res, next) => {
  try {
    const { year } = req.query;

    // Default year is the current year
    const targetYear = year ? parseInt(year) : new Date().getFullYear();

    // Aggregate orders by month for the target year
    const monthlyData = await Order.aggregate([
      {
        $match: {
          status: "Delivered", // Only consider delivered orders
          createdAt: {
            $gte: new Date(`${targetYear}-01-01`),
            $lte: new Date(`${targetYear}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" }, // Group by month (1 = Jan, 2 = Feb, etc.)
          totalSales: { $sum: 1 }, // Count the number of orders
          totalRevenue: { $sum: "$totalPrice" }, // Sum up the revenue
        },
      },
      {
        $sort: { _id: 1 }, // Sort by month
      },
    ]);

    // Format the data into a frontend-friendly structure
    const formattedData = Array(12)
      .fill({})
      .map((_, index) => {
        const monthData = monthlyData.find(
          (data) => data._id === index + 1
        ) || {
          totalSales: 0,
          totalRevenue: 0,
        };

        return {
          month: new Date(0, index).toLocaleString("default", {
            month: "short",
          }), // Jan, Feb, etc.
          totalSales: monthData.totalSales,
          totalRevenue: monthData.totalRevenue,
          averageOrderValue:
            monthData.totalSales > 0
              ? (monthData.totalRevenue / monthData.totalSales).toFixed(2)
              : 0,
        };
      });

    // Respond with the data
    res.status(200).json({
      success: true,
      message: "Monthly sales data fetched successfully.",
      data: formattedData,
    });
  } catch (error) {
    console.error("Error fetching monthly sales data:", error);
    return next(new ErrorResponse("Failed to fetch monthly sales data.", 500));
  }
});

const userGrowthChart = asyncHandler(async (req, res, next) => {
  try {
    const { year } = req.query;

    // Default year is the current year
    const targetYear = year ? parseInt(year) : new Date().getFullYear();

    // Aggregate orders by month for the target year
    const monthlyData = await User.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(`${targetYear}-01-01`),
            $lte: new Date(`${targetYear}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" }, // Group by month ( 1- Jan, 2 = Feb etc. )
          totalUsers: { $sum: 1 }, // Count the number of users
        },
      },
      {
        $sort: { _id: 1 }, // Sort by month
      },
    ]);
    console.log(monthlyData);

    // Format the data into a frontend-friently structure
    const formattedData = Array(12)
      .fill({})
      .map((_, index) => {
        const monthData = monthlyData.find(
          (data) => data._id === index + 1
        ) || { totalUsers: 0 };

        return {
          month: new Date(0, index).toLocaleString("default", {
            month: "short",
          }), // Jan, Feb, etc.
          totalUsers: monthData.totalUsers,
        };
      });

    // Response with the data
    res.status(200).json({
      success: true,
      message: "Monthly users growth data fetched successfully",
      data: formattedData,
    });
  } catch (error) {
    console.log("Error fetdching monthly user growth data", error);
    return next(new ErrorResponse("Failed to fetch monthly user growth data."));
  }
});

const salesByCategory = asyncHandler(async (req, res, next) => {
  try {
    const categorySales = await Order.aggregate([
      { $unwind: "$orderItems" }, // Decompose items array into individual items
      {
        $lookup: {
          from: "products", // Join with Product collection
          localField: "orderItems.product",
          foreignField: "_id",
          as: "productInfo",
        },
      },
      { $unwind: "$productInfo" }, // Unwind product info
      {
        $lookup: {
          from: "categories", // Join with category collection
          localField: "productInfo.category", // Reference category in Product collection
          foreignField: "_id", // Match with _id field in Category collection
          as: "categoryInfo",
        },
      },
      { $unwind: "$categoryInfo" }, // Unwind categoryInfo array for easy access
      {
        $group: {
          _id: "$categoryInfo._id", // Group by category ID
          name: { $first: "$categoryInfo.name" }, // Get the category name
          totalRevenue: {
            $sum: { $multiply: ["$orderItems.quantity", "$orderItems.price"] },
          },
          totalSalesVolume: { $sum: "$orderItems.quantity" },
        },
      },
      { $sort: { totalRevenue: -1 } }, // Sort by revenue (optional)
    ]);

    res.status(200).json({
      success: true,
      message: "Sales by category fetched successfully",
      data: categorySales,
    });
  } catch (error) {
    console.error(error);
    return next(
      new ErrorResponse("Failed to fetch sales by category data", 500)
    );
  }
});

const salesPerformance = asyncHandler(async (req, res, next) => {
  try {
    const { interval = "monthly" } = req.query; // 'daily' or 'weekly'
    // const dateFormat = interval === "weekly" ? "%Y-%U" : "%Y-%m-%d"; // Weekly or Daily format
    const dateFormat = interval === "weekly" ? "%Y-%U" : "%Y-%m"; // Weekly or Daily format

    const salesData = await Order.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: dateFormat, date: "$createdAt" }, // Group by day/week
          },
          totalRevenue: { $sum: "$totalPrice" }, // Sum of revenue
          totalOrders: { $sum: 1 }, // Count of orders
        },
      },
      { $sort: { _id: 1 } }, // Sort by date
    ]);

    res.status(200).json({
      success: true,
      message: `Sales performance data (${interval}) fetched successfully`,
      data: salesData,
    });
  } catch (error) {
    console.error(error);
    return next(
      new ErrorResponse("Failed to fetch sales performance data", 500)
    );
  }
});

// <============ Product & Inventory Analytics ===========>

const topSellingProducts = asyncHandler(async (req, res, next) => {
  try {
    const { sortBy = "quantity", limit = 10 } = req.query; // Sort by 'quantity' or 'revenue'

    const productData = await Order.aggregate([
      { $unwind: "$orderItems" }, // Deconstruct the orderItems array
      {
        $lookup: {
          from: "products",
          localField: "orderItems.product",
          foreignField: "_id",
          as: "productInfo",
        },
      },
      { $unwind: "$productInfo" },
      {
        $group: {
          _id: "$orderItems.product", // Group by product ID
          productName: { $first: "$productInfo.name" }, // Get product name
          totalQuantity: { $sum: "$orderItems.quantity" }, // Total quantity sold
          totalRevenue: {
            $sum: { $multiply: ["$orderItems.quantity", "$orderItems.price"] },
          }, // Total revenue
        },
      },
      {
        $sort:
          sortBy === "quantity" ? { totalQuantity: -1 } : { totalRevenue: -1 },
      }, // Sort by chosen metric
      { $limit: parseInt(limit) }, // Limit the number of products
    ]);

    res.status(200).json({
      success: true,
      message: "Top-selling products fetched successfully",
      data: productData,
    });
  } catch (error) {
    console.error(error);
    return next(new ErrorResponse("Failed to fetch top-selling products", 500));
  }
});

const lowStockProducts = asyncHandler(async (req, res, next) => {
  try {
    const { threshold = 10, limit = 10 } = req.query; // Default threshold is 10

    // Fetch products with stock below the threshold
    const lowStockData = await Product.find({ stock: { $lt: threshold } })
      .sort({ stock: 1 }) // Sort by stock in ascending order
      .limit(parseInt(limit)) // Limit the number of products
      .select("name stock"); // Select only the name and stock fields

    res.status(200).json({
      success: true,
      message: "Low stock products fetched successfully",
      data: lowStockData,
    });
  } catch (error) {
    console.error(error);
    return next(new ErrorResponse("Failed to fetch low stock products", 500));
  }
});

const stockValueByCategory = asyncHandler(async (req, res, next) => {
  try {
    const result = await Product.aggregate([
      {
        $group: {
          _id: "$category", // Group by product category
          totalStockValue: {
            $sum: { $multiply: ["$stock", "$price"] }, // Calculate stock value
          },
        },
      },
      {
        $sort: { totalStockValue: -1 }, // Sort by stock value (highest first)
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Stock value by category fetched successfully",
      data: result,
    });
  } catch (error) {
    console.error(error);
    return next(
      new ErrorResponse("Failed to fetch stock value by category", 500)
    );
  }
});

// <============= Order & Cart Analytics ==============>

const orderStatusBreakdown = asyncHandler(async (req, res, next) => {
  try {
    const result = await Order.aggregate([
      {
        $group: {
          _id: "$status", // Group by order status
          count: { $sum: 1 }, // Count the number of orders for each status
        },
      },
      {
        $project: {
          _id: 1,
          count: 1,
        },
      },
    ]);

    // Calculate total orders to get percentages
    const totalOrders = result.reduce((sum, status) => sum + status.count, 0);
    const breakdown = result.map((item) => ({
      name: item._id,
      count: item.count,
      percentage: ((item.count / totalOrders) * 100).toFixed(2), // Calculate percentage
    }));

    res.status(200).json({
      success: true,
      message: "Order status breakdown fetched successfully",
      data: breakdown,
    });
  } catch (error) {
    console.error(error);
    return next(
      new ErrorResponse("Failed to fetch order status breakdown", 500)
    );
  }
});

const orderVolumeOverTime = asyncHandler(async (req, res, next) => {
  try {
    const { period = "daily" } = req.query; // Default period is daily
    let groupFormat;

    // Define the grouping format based on the period
    if (period === "daily") {
      groupFormat = {
        $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
      };
    } else if (period === "weekly") {
      groupFormat = { $dateToString: { format: "%Y-%U", date: "$createdAt" } }; // Week of the year
    } else if (period === "monthly") {
      groupFormat = { $dateToString: { format: "%Y-%m", date: "$createdAt" } }; // Year and Month
    } else {
      return next(new ErrorResponse("Invalid period specified", 400));
    }

    const result = await Order.aggregate([
      {
        $group: {
          _id: groupFormat, // Group by daily, weekly, or monthly format
          count: { $sum: 1 }, // Count the number of orders
        },
      },
      {
        $sort: { _id: 1 }, // Sort by date in ascending order
      },
    ]);

    res.status(200).json({
      success: true,
      message: `Order volume grouped by ${period} fetched successfully`,
      data: result.map((item) => ({
        period: item._id,
        count: item.count,
      })),
    });
  } catch (error) {
    console.error(error);
    return next(new ErrorResponse("Failed to fetch order volume data", 500));
  }
});

const averageOrderValue = asyncHandler(async (req, res, next) => {
  try {
    const { period = "daily" } = req.query; // Default period is daily
    let groupFormat;

    // Define the grouping format based on the period
    if (period === "daily") {
      groupFormat = {
        $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
      };
    } else if (period === "weekly") {
      groupFormat = { $dateToString: { format: "%Y-%U", date: "$createdAt" } }; // Week of the year
    } else if (period === "monthly") {
      groupFormat = { $dateToString: { format: "%Y-%m", date: "$createdAt" } }; // Year and Month
    } else {
      return next(new ErrorResponse("Invalid period specified", 400));
    }

    const result = await Order.aggregate([
      {
        $group: {
          _id: groupFormat, // Group by the specified period
          totalRevenue: { $sum: "$totalPrice" }, // Sum of all order values
          totalOrders: { $sum: 1 }, // Count of orders
        },
      },
      {
        $addFields: {
          averageOrderValue: { $divide: ["$totalRevenue", "$totalOrders"] }, // Calculate AOV
        },
      },
      {
        $sort: { _id: 1 }, // Sort by date in ascending order
      },
    ]);

    res.status(200).json({
      success: true,
      message: `Average order value grouped by ${period} fetched successfully`,
      data: result.map((item) => ({
        period: item._id,
        averageOrderValue: item.averageOrderValue.toFixed(2), // Round to 2 decimal places
      })),
    });
  } catch (error) {
    console.error(error);
    return next(
      new ErrorResponse("Failed to fetch average order value data", 500)
    );
  }
});

// <============= Customer Analytics ============>
const newVsReturningCustomers = asyncHandler(async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;

    // Filter orders by the specified date range
    const matchStage = {};
    if (startDate && endDate) {
      matchStage.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const result = await Order.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: "$user", // Group by user ID
          orderCount: { $sum: 1 }, // Count the number of orders per user
        },
      },
      {
        $group: {
          _id: null, // No specific grouping
          newCustomers: {
            $sum: { $cond: [{ $eq: ["$orderCount", 1] }, 1, 0] },
          }, // Users with only one order
          returningCustomers: {
            $sum: { $cond: [{ $gt: ["$orderCount", 1] }, 1, 0] },
          }, // Users with more than one order
        },
      },
    ]);

    const data = result[0] || { newCustomers: 0, returningCustomers: 0 };

    res.status(200).json({
      success: true,
      message: "New vs. Returning Customers data fetched successfully",
      data,
    });
  } catch (error) {
    console.error(error);
    return next(new ErrorResponse("Failed to fetch customer data", 500));
  }
});

module.exports = {
  getSalesOverview,
  salesByCategory,
  salesPerformance,
  topSellingProducts,
  lowStockProducts,
  stockValueByCategory,
  orderStatusBreakdown,
  orderVolumeOverTime,
  averageOrderValue,
  newVsReturningCustomers,
  userGrowthChart
};
