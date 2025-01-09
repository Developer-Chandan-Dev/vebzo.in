const express = require("express");
const router = express.Router();
const {
  createOrder,
  getOrders,
  getOrderById,
  updatePaymentStatus,
  updateOrderStatus,
} = require("../controller/orderController");
const { protect, admin } = require("../middlewares/authMiddleware");

// Validation imports
const validate = require("../middlewares/validation.middleware");
const { orderValidationSchema } = require("../validations/validateOrder");

// Order Routes
router.post("/", protect, validate(orderValidationSchema), createOrder); // Create a new order
router.get("/", protect, admin, getOrders); // Get all orders (Admin)
router.get("/:id", protect, getOrderById); // Get order by ID
router.put("/:id/payment-status", protect, admin, updatePaymentStatus); // Update Payment Status
router.put("/:id/status", protect, admin, updateOrderStatus); // Update Order Status

module.exports = router;
