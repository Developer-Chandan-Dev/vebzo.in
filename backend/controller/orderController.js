const Order = require("../models/order.model");
const {
  decreaseStock,
  validateStock,
} = require("../controller/productStockController");

// @desc Create a new order
// @route POST /api/v1/orders
// @access Private
const createOrder = async (req, res) => {
  const { orderItems, shippingAddress, totalPrice, paymentMethod } = req.body;

  if (!orderItems || orderItems.length === 0) {
    return res.status(400).json({ success: false, message: "No order items" });
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
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get all orders (Admin only)
// @route GET /api/v1/orders
// @access Admin
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "username email")
      .populate("orderItems.product", "name");
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get a single order by ID
// @route GET /api/v1/orders/:id
// @access Private
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "username email")
      .populate("orderItems.product", "name");

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Update payment status of an order
// @route PUT /api/v1/orders/:id/payment-status
// @access Admin
const updatePaymentStatus = async (req, res) => {
  const { paymentStatus } = req.body;

  if (!["Pending", "Paid", "Failed"].includes(paymentStatus)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid payment status" });
  }

  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    order.paymentStatus = paymentStatus;
    const updatedOrder = await order.save();

    return res.status(200).json({ success: true, date: updatedOrder });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// @desc Update order status
// @route PUT /api/v1/orders/:id/status
// @access Admin
const updateOrderStatus = async (req, res) => {
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
    return res
      .status(400)
      .json({ success: false, message: "Invalid order status" });
  }

  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    order.status = status;

    // If status is "Delivered", set deliveredAt to the current date/time
    if (status === "Delivered") {
      order.deliveredAt = Date.now();
    }

    const updatedOrder = await order.save();
    return res.status(200).json({ success: true, date: updatedOrder });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updatePaymentStatus,
  updateOrderStatus,
};
