const Order = require("../models/order.model");
const {
  decreaseStock,
  validateStock,
} = require("../controller/productStockController");
const asyncHandler = require("../utils/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");

// @desc Create a new order
// @route POST /api/v1/orders
// @access Private
const createOrder = asyncHandler(async (req, res, next) => {
  const { orderItems, shippingAddress, totalPrice, paymentMethod } = req.body;

  if (!orderItems || orderItems.length === 0) {
    return next(new ErrorResponse("No order items", 400));
  }

  try {
    // Validate stock before placing the order
    await validateStock(orderItems);

    const order = new Order({
      user: req.user.id,
      orderItems,
      shippingAddress,
      totalPrice,
      paymentMethod,
    });

    // Update stock
    await decreaseStock(orderItems);

    const createdOrder = await order.save();
    res.status(201).json({ success: true, data: createdOrder });
  } catch (error) {
    console.log(error);
    return next(new ErrorResponse(error, 500));
  }
});

// @desc Get all orders (Admin only)
// @route GET /api/v1/orders
// @access Admin
const getOrders = asyncHandler(async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate("user", "username email")
      .populate("orderItems.product", "name");
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    return next(new ErrorResponse("Internal Server Error", 500));
  }
});

// @desc Get a single order by ID
// @route GET /api/v1/orders/:id
// @access Private
const getOrderById = asyncHandler(async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "username email")
      .populate("orderItems.product", "name");

    if (!order) {
      return next(new ErrorResponse("Order not found", 404));
    }

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    console.log(error);
    return next(new ErrorResponse("Internal Server Error", 500));
  }
});

// @desc Update payment status of an order
// @route PUT /api/v1/orders/:id/payment-status
// @access Admin
const updatePaymentStatus = asyncHandler(async (req, res, next) => {
  const { paymentStatus } = req.body;

  if (!["Pending", "Paid", "Failed"].includes(paymentStatus)) {
    return next(new ErrorResponse("Invalid payment status", 400));
  }

  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new ErrorResponse("Order not found", 404));
    }

    order.paymentStatus = paymentStatus;
    const updatedOrder = await order.save();

    res.status(200).json({ success: true, date: updatedOrder });
  } catch (error) {
    console.log(error);
    return next(new ErrorResponse("Internal Server Error", 500));
  }
});

// @desc Update order status
// @route PUT /api/v1/orders/:id/status
// @access Admin
const updateOrderStatus = asyncHandler(async (req, res, next) => {
  const { status } = req.body;

  if (
    ![
      "Pending",
      "Confirmed",
      "Out for Delivery",
      "Delivered",
      "Cancelled",
    ].includes(status)
  ) {
    return next(new ErrorResponse("Invalid order status", 400));
  }

  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new ErrorResponse("Order not found", 4040));
    }

    order.status = status;

    // If status is "Delivered", set deliveredAt to the current date/time
    if (status === "Delivered") {
      order.deliveredAt = Date.now();
    }

    const updatedOrder = await order.save();

    res.status(200).json({ success: true, date: updatedOrder });
  } catch (error) {
    console.log(error);
    return next(new ErrorResponse("Internal Server Error", 500));
  }
});

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updatePaymentStatus,
  updateOrderStatus,
};
