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
} = require("../controller/analyticsController");

const { protect, admin } = require("../middlewares/authMiddleware");

router.get("/total-sales", protect, admin, getTotalSalesRevenue);
router.get("/total-orders", protect, admin, getTotalOrders);
router.get("/top-products", protect, admin, getTopSellingProducts);
router.get("/low-stock", protect, admin, getLowStockProducts);
router.get("/sales-trends", protect, admin, getSalesTrends);
router.get("/payment-methods", protect, admin, getPaymentMethodInsights);
router.get("/customers", protect, admin, getCustomerInsights);
router.get("/orders/monthly", protect, admin, getMonthlyOrderDetails);
router.get("/orders/weekly", protect, admin, getWeeklyOrderDetails);
router.get("/orders/daily", protect, admin, getDailyOrderDetails);
router.get("/orders/date-range", protect, admin, getOrdersByDateRange);

module.exports = router;
