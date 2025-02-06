const express = require("express");
const router = express.Router();
const {
  createOrder,
  getOrders,
  getOrderById,
  updatePaymentStatus,
  updateOrderStatus,
  getMyOrders,
  deleteOrder,
} = require("../controller/orderController");
const { protect, admin, checkRole } = require("../middlewares/authMiddleware");

// Validation imports
const validate = require("../middlewares/validation.middleware");
const { orderValidationSchema } = require("../validations/validateOrder");

// Order Routes
router.post(
  "/",
  protect,
  checkRole("admin", "manager"),
  validate(orderValidationSchema),
  createOrder
); // Create a new order
router.get("/", protect, admin, getOrders); // Get all orders (Admin)
router.delete("/:id", protect, checkRole("admin", "manager"), deleteOrder); // Delete order by order _id (Admin)
router.get("/details/:id", protect, getOrderById); // Get order by ID
router.put(
  "/:id/payment-status",
  protect,
  checkRole("admin", "manager"),
  updatePaymentStatus
); // Update Payment Status
router.put(
  "/:id/status",
  protect,
  checkRole("admin", "manager"),
  updateOrderStatus
); // Update Order Status
router.get("/my-orders", protect, getMyOrders);

module.exports = router;
