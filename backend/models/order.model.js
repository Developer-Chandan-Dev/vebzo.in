const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    shippingAddress: {
      address: { type: String, required: true },
      village: {
        type: String,
        required: true,
        enum: ["Bhogwara", "Udagi", "Savdih", "Belhabandh (Kwajgi patti)", "Nevada", "Bhorai Ka Pura", "Sarai Hariram"],
      },
      city: { type: String, required: true, enum: ["Prayagraj"] },
      phone: { type: String, required: true, min: 10, max: 10 },
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    grandTotal : {
      type: Number,
    },
    status: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "Out for Delivery",
        "Delivered",
        "Cancelled",
      ],
      default: "Pending",
    },
    paymentMethod: {
      type: String,
      enum: ["COD", "Online"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },
    deliveredAt: {
      type: Date,
    },
    deliveryCharge: {
      type: Number,
      default: 0,
    },
    disabledByUser: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
