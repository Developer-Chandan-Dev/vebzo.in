const express = require("express");
const router = express.Router();

const {
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
  getTotalSales,
  getSalesByDate,
  getTopCustomers,
  getRevenueByCategory,

  getUserGrowth,

  getOrderStatusCounts,
  getOrderTrends,
} = require("../controller/analyticsController");

// Charts
const {
  getMonthlySales,
  salesByCategory,
  salesPerformance,
  topSellingProducts,
  lowStockProducts,
  stockValueByCategory,
  orderStatusBreakdown,
  orderVolumeOverTime,
  averageOrderValue,
  newVsReturningCustomers
} = require("../controller/analyticsChartController");

// Card section controller
const {
  getOverview,
  orderCardData,
  salesCardData,
  userCardData,
  productCardData,
  analyticsCardData,
} = require("../controller/cardSectionController");

const { protect, admin } = require("../middlewares/authMiddleware");

// Overview Page
router.get("/overview-cards", protect, admin, getOverview);
router.get("/chart/monthly-sales", protect, admin, getMonthlySales); // Analytics route for monthly sales
router.get("/chart/top-selling-products", protect,admin, topSellingProducts) // Analytics route for top selling products
router.get("/chart/order-status-breakdown", protect,admin, orderStatusBreakdown) // Analytics route for getting order status breakdown
router.get("/chart/low-stock-products", protect,admin, lowStockProducts) // Analytics route for top low stock products
// Most active village card

// Orders Page
router.get("/order-cards", protect, admin, orderCardData);


// Data
// Sales & Revenue routes
router.get("/total-sales", protect, admin, getTotalSales);
router.get("/sales-by-date", protect, admin, getSalesByDate); // Analytics route for sales by date
router.get("/top-customers", protect, admin, getTopCustomers); // Analytics route for sales by date
router.get("/revenue-by-category", protect, admin, getRevenueByCategory); // Analytics route for sales by date

// Product & Inventory routes
router.get("/top-selling-products", protect, admin, getTopSellingProducts);

// <============== Users routes ================>
router.get("/users-growth", protect, admin, getUserGrowth);

// <============== Order & Cart Analytics ===============>
router.get("/order-status", protect, admin, getOrderStatusCounts);
router.get("/order-trends", protect, admin, getOrderTrends);

router.get("/total-orders", protect, admin, getTotalOrders);
router.get("/low-stock", protect, admin, getLowStockProducts);
router.get("/sales-trends", protect, admin, getSalesTrends);
router.get("/payment-methods", protect, admin, getPaymentMethodInsights);
router.get("/customers", protect, admin, getCustomerInsights);
router.get("/orders/monthly", protect, admin, getMonthlyOrderDetails);
router.get("/orders/weekly", protect, admin, getWeeklyOrderDetails);
router.get("/orders/daily", protect, admin, getDailyOrderDetails);
router.get("/orders/date-range", protect, admin, getOrdersByDateRange);

// $$$$$=============> Charts <=============$$$$$
// <========= Sales Charts ==========>
router.get("/chart/monthly-sales", protect, admin, getMonthlySales); // Analytics route for monthly sales
router.get("/chart/category-sales", protect, admin, salesByCategory); // Analytics route for getting sales by category
router.get("/chart/sales-performance", protect, admin, salesPerformance); // Analytics route for checking sales performance

// <============ Product & Inventory Analytics ===========>
router.get("/chart/top-selling-products", protect,admin, topSellingProducts) // Analytics route for top selling products
router.get("/chart/low-stock-products", protect,admin, lowStockProducts) // Analytics route for top low stock products
router.get("/chart/stock-value-by-category", protect,admin, stockValueByCategory) // Analytics route for getting stock value by category

// <============= Order & Cart Analytics ==============>
router.get("/chart/order-status-breakdown", protect,admin, orderStatusBreakdown) // Analytics route for getting order status breakdown
router.get("/chart/order-volume-overtime", protect,admin, orderVolumeOverTime) // Analytics route for getting order status breakdown
router.get("/chart/average-order-value", protect, admin, averageOrderValue); 

// <============= Customer Analytics ============>
router.get("/chart/new-vs-returning-customers", protect, admin, newVsReturningCustomers); 




// Card Section routes

router.get("/sales-cards", protect, admin, salesCardData);
router.get("/user-cards", protect, admin, userCardData);
router.get("/product-cards", protect, admin, productCardData);
router.get("/analytics-cards", protect, admin, analyticsCardData);

module.exports = router;
