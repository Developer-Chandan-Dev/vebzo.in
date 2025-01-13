const Order = require("../models/order.model");
const Product = require("../models/product.model");
const User = require("../models/user.models");
const asyncHandler = require("../utils/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");

const getOverview = asyncHandler(async (req, res, next) => {
  try {
    const totalSales = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const newUsers = await User.countDocuments({
      createdAt: {
        $gte: new Date(new Date().setDate(new Date().getDate() - 7)),
      },
    });
    const totalProducts = await Product.countDocuments({});
    const pendingOrders = await Order.countDocuments({ status: "Pending" });

    res.status(200).json({
      success: true,
      data: {
        totalSales: totalSales[0]?.total || 0,
        newUsers,
        totalProducts,
        pendingOrders,
      },
    });
  } catch (error) {
    console.error(error);
    next(new ErrorResponse("Failed to fetch overview data", 500));
  }
});

const orderCardData = asyncHandler(async (req, res, next) => {
  try {
    const result = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          pendingOrders: {
            $sum: { $cond: [{ $eq: ["$status", "Pending"] }, 1, 0] },
          },
          deliveredOrders: {
            $sum: { $cond: [{ $eq: ["$status", "Delivered"] }, 1, 0] },
          },
          cancelledOrders: {
            $sum: { $cond: [{ $eq: ["$status", "Cancelled"] }, 1, 0] },
          },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: result[0] || {
        totalOrders: 0,
        pendingOrders: 0,
        deliveredOrders: 0,
        cancelledOrders: 0,
      },
    });
  } catch (error) {
    console.error(error);
    next(new ErrorResponse("Failed to fetch overview data", 500));
  }
});

const salesCardData = asyncHandler(async (req, res, next) => {
  try {
    const currentDate = new Date();
    const currentMonthStart = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const currentDayStart = new Date(currentDate.setHours(0, 0, 0, 0));

    // 1. Total Revenue: Sum of revenue from all orders
    const totalRevenue = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalPrice" },
        },
      },
    ]);

    // 2. Monthly Revenue: Revenue for the current month
    const monthlyRevenue = await Order.aggregate([
      {
        $match: { createdAt: { $gte: currentMonthStart } },
      },
      {
        $group: {
          _id: null,
          monthlyRevenue: { $sum: "$totalPrice" },
        },
      },
    ]);

    // 3. Best-Selling Product: The product with the highest sales (by quantity sold)
    const bestSellingProduct = await Order.aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.productId",
          totalQuantity: { $sum: "$items.quantity" },
        },
      },
      {
        $sort: { totalQuantity: -1 },
      },
      { $limit: 1 },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "productInfo",
        },
      },
      { $unwind: "$productInfo" },
      {
        $project: {
          _id: 0,
          productId: "$_id",
          productName: "$productInfo.name",
          totalQuantity: 1,
        },
      },
    ]);

    // 4. Highest Revenue Day: The day with the most revenue
    const highestRevenueDay = await Order.aggregate([
      {
        $project: {
          day: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          totalPrice: 1,
        },
      },
      {
        $group: {
          _id: "$day",
          totalRevenue: { $sum: "$totalPrice" },
        },
      },
      {
        $sort: { totalRevenue: -1 },
      },
      { $limit: 1 },
    ]);

    // Prepare the response data
    const result = {
      totalRevenue: totalRevenue[0]?.totalRevenue || 0,
      monthlyRevenue: monthlyRevenue[0]?.monthlyRevenue || 0,
      bestSellingProduct: bestSellingProduct[0] || {
        productName: "N/A",
        totalQuantity: 0,
      },
      highestRevenueDay: highestRevenueDay[0] || {
        _id: "N/A",
        totalRevenue: 0,
      },
    };

    res.status(200).json({
      success: true,
      message: "Sales data fetched successfully",
      data: result,
    });
  } catch (error) {
    console.error(error);
    return next(new ErrorResponse("Failed to fetch sales data", 500));
  }
});

const userCardData = asyncHandler(async (req, res, next) => {
  try {
    const currentDate = new Date();
    const currentDateStartOfDay = new Date(currentDate.setHours(0, 0, 0, 0));
    const startOfWeek = new Date(
      currentDate.setDate(currentDate.getDate() - currentDate.getDay())
    ); // Start of the current week
    const thirtyDaysAgo = new Date(
      currentDate.setDate(currentDate.getDate() - 30)
    ); // 30 days ago for inactive users

    // 1. Total Users: Count of all registered users
    const totalUsers = await User.countDocuments({});

    // 2. New Users: Users who signed up today or this week
    const newUsers = await User.countDocuments({
      createdAt: { $gte: startOfWeek },
    });

    // 3. Active Users: Users who placed orders or engaged recently
    const activeUsers = await User.countDocuments({
      lastActiveAt: { $gte: currentDateStartOfDay }, // Assuming `lastActiveAt` is updated when user engages
    });

    // 4. Inactive Users: Users who haven't engaged for a specified period (e.g., 30 days)
    const inactiveUsers = await User.countDocuments({
      lastActiveAt: { $lte: thirtyDaysAgo },
    });

    // Prepare response data
    res.status(200).json({
      success: true,
      message: "User data fetched successfully",
      data: {
        totalUsers,
        newUsers,
        activeUsers,
        inactiveUsers,
      },
    });
  } catch (error) {
    console.error(error);
    return next(new ErrorResponse("Failed to fetch user data", 500));
  }
});

const productCardData = asyncHandler(async (req, res, next) => {
  try {
    // 1. Total Products
    const totalProducts = await Product.countDocuments({});

    // 2. Out-of-Stock Products
    const outOfStockProducts = await Product.countDocuments({ stock: 0 });

    // 3. Most Viewed Product
    const mostViewedProduct = await Product.find({})
      .sort({ views: -1 }) // Sort by views in descending order
      .limit(1)
      .select("name views"); // Only return name and views for brevity

    // 4. Featured Products
    const featuredProducts = await Product.countDocuments({ isFeatured: true });

    // Response Data
    res.status(200).json({
      success: true,
      message: "Product data fetched successfully",
      data: {
        totalProducts,
        outOfStockProducts,
        mostViewedProduct: mostViewedProduct[0] || { name: "N/A", views: 0 },
        featuredProducts,
      },
    });
  } catch (error) {
    console.error(error);
    return next(new ErrorResponse("Failed to fetch product data", 500));
  }
});

// Supporter
const salesTrends = asyncHandler(async (req, res, next) => {
  try {
    const today = new Date();
    const startOfWeek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - today.getDay()
    );
    const startOfLastWeek = new Date(startOfWeek);
    startOfLastWeek.setDate(startOfLastWeek.getDate() - 7);
    const endOfLastWeek = new Date(startOfWeek);
    endOfLastWeek.setDate(endOfLastWeek.getDate() - 1);

    // Sales for this week
    const thisWeekSales = await Order.aggregate([
      { $match: { createdAt: { $gte: startOfWeek } } },
      { $group: { _id: null, totalSales: { $sum: "$totalPrice" } } },
    ]);

    // Sales for last week
    const lastWeekSales = await Order.aggregate([
      { $match: { createdAt: { $gte: startOfLastWeek, $lte: endOfLastWeek } } },
      { $group: { _id: null, totalSales: { $sum: "$totalPrice" } } },
    ]);

    const currentSales = thisWeekSales[0]?.totalSales || 0;
    const previousSales = lastWeekSales[0]?.totalSales || 0;

    const percentageChange = previousSales
      ? ((currentSales - previousSales) / previousSales) * 100
      : 0;

    res.status(200).json({
      success: true,
      salesTrends: {
        currentSales,
        previousSales,
        percentageChange: percentageChange.toFixed(2),
      },
    });
  } catch (error) {
    console.error(error);
    next(new ErrorResponse("Failed to fetch sales trends", 500));
  }
});

// Supporter
const userGrowth = asyncHandler(async (req, res, next) => {
  try {
    const today = new Date();
    const startOfWeek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - today.getDay()
    );
    const startOfLastWeek = new Date(startOfWeek);
    startOfLastWeek.setDate(startOfLastWeek.getDate() - 7);
    const endOfLastWeek = new Date(startOfWeek);
    endOfLastWeek.setDate(endOfLastWeek.getDate() - 1);

    // Users registered this week
    const thisWeekUsers = await User.countDocuments({
      createdAt: { $gte: startOfWeek },
    });

    // Users registered last week
    const lastWeekUsers = await User.countDocuments({
      createdAt: { $gte: startOfLastWeek, $lte: endOfLastWeek },
    });

    const percentageGrowth = lastWeekUsers
      ? ((thisWeekUsers - lastWeekUsers) / lastWeekUsers) * 100
      : 0;

    res.status(200).json({
      success: true,
      userGrowth: {
        thisWeekUsers,
        lastWeekUsers,
        percentageGrowth: percentageGrowth.toFixed(2),
      },
    });
  } catch (error) {
    console.error(error);
    next(new ErrorResponse("Failed to fetch user growth data", 500));
  }
});

// Supporter
const topProductCategory = asyncHandler(async (req, res, next) => {
  try {
    const categorySales = await Order.aggregate([
      { $unwind: "$items" },
      {
        $lookup: {
          from: "products",
          localField: "items.productId",
          foreignField: "_id",
          as: "productInfo",
        },
      },
      { $unwind: "$productInfo" },
      {
        $group: {
          _id: "$productInfo.category",
          totalSales: { $sum: "$items.quantity" },
        },
      },
      { $sort: { totalSales: -1 } },
      { $limit: 1 },
    ]);

    const topCategory = categorySales[0] || { _id: "N/A", totalSales: 0 };

    res.status(200).json({
      success: true,
      topProductCategory: topCategory,
    });
  } catch (error) {
    console.error(error);
    next(new ErrorResponse("Failed to fetch top product category", 500));
  }
});

// Supporter
const mostActiveVillage = asyncHandler(async (req, res, next) => {
  try {
    // Group by village and calculate total sales
    const villageSales = await Order.aggregate([
      {
        $group: {
          _id: "$shippingAddress.village", // Group by the village field
          totalSales: { $sum: "$totalPrice" }, // Sum total price of orders
        },
      },
      { $sort: { totalSales: -1 } }, // Sort villages by total sales in descending order
      { $limit: 1 }, // Get the village with the highest sales
    ]);

    // Check if we have any results
    const topVillage = villageSales[0] || { _id: "N/A", totalSales: 0 };

    res.status(200).json({
      success: true,
      mostActiveVillage: {
        village: topVillage._id,
        totalSales: topVillage.totalSales,
      },
    });
  } catch (error) {
    console.error(error);
    next(new ErrorResponse("Failed to fetch most active village", 500));
  }
});

const analyticsCardData = asyncHandler(async (req, res, next) => {
  try {
    // Call all the above methods or their logic here
    const salesTrendsData = salesTrends();
    const userGrowthData = await userGrowth();
    const topCategoryData = await topProductCategory();
    const activeVillageData = await mostActiveVillage();

    res.status(200).json({
      success: true,
      data: {
        salesTrends: salesTrendsData,
        userGrowth: userGrowthData,
        topProductCategory: topCategoryData,
        mostActiveVillage: activeVillageData,
      },
    });
  } catch (error) {
    console.error(error);
    next(new ErrorResponse("Failed to fetch analytics data", 500));
  }
});

module.exports = {
  getOverview,
  orderCardData,
  salesCardData,
  userCardData,
  productCardData,
  analyticsCardData,
};
