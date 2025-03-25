const mongoose = require("mongoose");
const {
  ensureUncategorizedExists,
} = require("../utils/ensureUncategorizedExists");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    purchasePrice: {
      type: Number,
      // required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    salesPrice: {
      type: Number,
    },
    stock: {
      type: Number,
      required: true, // Initial  sotkc quantity
      default: 0,
    },
    sold: {
      type: Number,
      default: 0, // Number of units sold
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: async function () {
        return await ensureUncategorizedExists();
      },
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    imageUrl: {
      type: String,
      // required: true,
    },
    imageUrlPublicId: {
      type: String,
    },
    averageRating: {
      type: Number,
      default: 0, // Average rating of the product
    },
    totalRatings: {
      type: Number,
      default: 0, // Total number of ratings
    },
    views: { type: Number, default: 0 }, // New field for tracking views
    // Add other fields as required
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
