const Order = require("../models/order.model");
const Cart = require("../models/cart.models");
const {
  decreaseStock,
  validateStock,
} = require("../controller/productStockController");
const asyncHandler = require("../utils/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");

const generateOrderNumber = () => {
  const date = new Date();
  return `ORD-${date.getFullYear()}${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}${date
    .getDate()
    .toString()
    .padStart(2, "0")}-${Math.floor(1000 + Math.random() * 9000)}`;
};

// @desc Create a new order
// @route POST /api/v1/orders
// @access Private
const createOrder = asyncHandler(async (req, res, next) => {
  const {
    firstname,
    lastname,
    orderItems,
    shippingAddress,
    totalPrice,
    paymentMethod,
  } = req.body;

  if (!orderItems || orderItems.length === 0) {
    return next(new ErrorResponse("No order items", 400));
  }

  try {
    // Validate stock before placing the order
    await validateStock(orderItems);

    const order = new Order({
      user: req.user.id,
      firstname,
      lastname,
      orderId: generateOrderNumber(),
      orderItems,
      shippingAddress,
      totalPrice,
      paymentMethod,
    });

    // Update stock
    await decreaseStock(orderItems);

    const createdOrder = await order.save();
    if (createdOrder) {
      // Find the user's cart
      const cart = await Cart.findOne({ user: req.user.id });

      if (cart) {
        // Remove ordered products from the cart
        cart.cartItems = cart.cartItems.filter(
          (cartItem) =>
            !orderItems.some(
              (orderItem) =>
                orderItem.product.toString() === cartItem.product.toString()
            )
        );

        // Save the updated cart
        await cart.save();
      }
    }

    res.status(201).json({
      success: true,
      data: createdOrder,
      message: "Your order added successfully.",
    });
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
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const { status, paymentMethod, paymentStatus } = req.query;

    const filters = {};

    if (status) filters.status = { ...filters.status, $eq: status };
    if (paymentMethod)
      filters.paymentMethod = { ...filters.paymentMethod, $eq: paymentMethod };
    if (paymentStatus)
      filters.paymentStatus = { ...filters.paymentStatus, $eq: paymentStatus };

    const totalOrders = await Order.countDocuments(filters);
    const totalPages = Math.ceil(totalOrders / limit);

    // Fetch paginated and filtered data
    const orders = await Order.find(filters)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("user", "username email")
      .populate("orderItems.product", "name");

    res
      .status(200)
      .json({ success: true, data: orders, totalPages, totalOrders });
  } catch (error) {
    console.log(error);
    return next(new ErrorResponse("Internal Server Error", 500));
  }
});

// @desc Delete a order (Admin && Manager)
// @route GET /api/v1/orders/:id
// @access Admin & Manager
const deleteOrder = asyncHandler(async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new ErrorResponse("Order not found", 404));
    }

    await Order.findByIdAndDelete(req.params.id);

    res
      .status(200)
      .json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    console.log(error);
    return next(new ErrorResponse("Failed to delete order", 500));
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

    res
      .status(200)
      .json({ success: true, paymentStatus: updatedOrder.paymentStatus });
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

  // console.log(status);
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

    res.status(200).json({ success: true, status: updatedOrder.status });
  } catch (error) {
    console.log(error);
    return next(new ErrorResponse("Internal Server Error", 500));
  }
});

const getMyOrders = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.user;

    const order = await Order.find({ user: id }).populate(
      "orderItems.product",
      "name imageUrl"
    );

    if (!order) {
      return next(new ErrorResponse("Order not found", 404));
    }

    res.status(200).json({ order, totalOrders: order.length });
  } catch (error) {
    console.log(error);
    return next(new ErrorResponse("Failed to fetch my orders", 500));
  }
});

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updatePaymentStatus,
  updateOrderStatus,
  getMyOrders,
  deleteOrder,
};
