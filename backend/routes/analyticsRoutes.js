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

const { protect, admin, checkRole } = require("../middlewares/authMiddleware");

// Overview Page
router.get("/overview-cards", protect, checkRole("admin", "manager"), getOverview);
// router.get("/chart/sales-overview", protect, checkRole("admin", "manager"), getSalesOverview); // Analytics route for monthly sales
router.get("/chart/top-selling-products", protect, checkRole("admin", "manager"), topSellingProducts) // Analytics route for top selling products
router.get("/chart/order-status-breakdown", protect, checkRole("admin", "manager"), orderStatusBreakdown) // Analytics route for getting order status breakdown
router.get("/chart/low-stock-products", protect, checkRole("admin", "manager"), lowStockProducts) // Analytics route for top low stock products
// Most active village card

// Orders Page
router.get("/order-cards", protect, checkRole("admin", "manager"), orderCardData);


// Data
// Sales & Revenue routes
router.get("/total-sales", protect, checkRole("admin", "manager"), getTotalSales);
router.get("/sales-by-date", protect, checkRole("admin", "manager"), getSalesByDate); // Analytics route for sales by date
router.get("/top-customers", protect, checkRole("admin", "manager"), getTopCustomers); // Analytics route for sales by date
router.get("/revenue-by-category", protect, checkRole("admin", "manager"), getRevenueByCategory); // Analytics route for sales by date

// Product & Inventory routes
router.get("/top-selling-products", protect, checkRole("admin", "manager"), getTopSellingProducts);

// <============== Users routes ================>
router.get("/users-growth", protect, checkRole("admin", "manager"), getUserGrowth);
router.get("/chart/users-growth", protect, checkRole("admin"), userGrowthChart)

// <============== Order & Cart Analytics ===============>
router.get("/order-status", protect, checkRole("admin", "manager"), getOrderStatusCounts);
router.get("/order-trends", protect, checkRole("admin", "manager"), getOrderTrends);

router.get("/total-orders", protect, checkRole("admin", "manager"), getTotalOrders);
router.get("/low-stock", protect, checkRole("admin", "manager"), getLowStockProducts);
router.get("/sales-trends", protect, checkRole("admin", "manager"), getSalesTrends);
router.get("/payment-methods", protect, checkRole("admin", "manager"), getPaymentMethodInsights);
router.get("/customers", protect, checkRole("admin", "manager"), getCustomerInsights);
router.get("/orders/monthly", protect, checkRole("admin", "manager"), getMonthlyOrderDetails);
router.get("/orders/weekly", protect, checkRole("admin", "manager"), getWeeklyOrderDetails);
router.get("/orders/daily", protect, checkRole("admin", "manager"), getDailyOrderDetails);
router.get("/orders/date-range", protect, checkRole("admin", "manager"), getOrdersByDateRange);

// $$$$$=============> Charts <=============$$$$$
// <========= Sales Charts ==========>
router.get("/chart/sales-overview", protect, checkRole("admin", "manager"), getSalesOverview); // Analytics route for monthly sales
router.get("/chart/category-sales", protect, checkRole("admin", "manager"), salesByCategory); // Analytics route for getting sales by category
router.get("/chart/sales-performance", protect, checkRole("admin", "manager"), salesPerformance); // Analytics route for checking sales performance

// <============ Product & Inventory Analytics ===========>
router.get("/chart/top-selling-products", protect, checkRole("admin", "manager"), topSellingProducts) // Analytics route for top selling products
router.get("/chart/low-stock-products", protect, checkRole("admin", "manager"), lowStockProducts) // Analytics route for top low stock products
router.get("/chart/stock-value-by-category", protect, checkRole("admin", "manager"), stockValueByCategory) // Analytics route for getting stock value by category

// <============= Order & Cart Analytics ==============>
router.get("/chart/order-status-breakdown", protect, checkRole("admin", "manager"), orderStatusBreakdown) // Analytics route for getting order status breakdown
router.get("/chart/order-volume-overtime", protect, checkRole("admin", "manager"), orderVolumeOverTime) // Analytics route for getting order status breakdown
router.get("/chart/average-order-value", protect, checkRole("admin", "manager"), averageOrderValue); 

// <============= Customer Analytics ============>
router.get("/chart/new-vs-returning-customers", protect, checkRole("admin", "manager"), newVsReturningCustomers); 




// Card Section routes

router.get("/sales-cards", protect, checkRole("admin", "manager"), salesCardData);
router.get("/user-cards", protect, checkRole("admin"), userCardData);
router.get("/product-cards", protect, checkRole("admin", "manager"), productCardData);
router.get("/analytics-cards", protect, checkRole("admin", "manager"), analyticsCardData);

module.exports = router;
