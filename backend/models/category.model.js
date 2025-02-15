const mongoose = require("mongoose");
const Product = require("./product.model"); // Ensure Product is correctly imported
const ensureUncategorizedExists  = require('../utils/ensureUncategorizedExists'); // Ensure correct import

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// Middleware: When a category is deleted, assign its products to "Uncategorized"
categorySchema.pre("findOneAndDelete", async function (next) {
  try {
    const categoryId = this.getQuery()._id;

    if (typeof ensureUncategorizedExists !== "function") {
      throw new Error("ensureUncategorizedExists is not a function. Check your imports and exports!");
    }

    // Ensure "Uncategorized" category exists
    const uncategorized = await ensureUncategorizedExists(); // Ensure function is called correctly

    // Check if Product model is correctly imported
    if (!Product || !Product.updateMany) {
      throw new Error(
        "Product model is not defined or updateMany is not available."
      );
    }

    // Update all products belonging to the deleted category
    await Product.updateMany(
      { category: categoryId },
      { category: uncategorized._id }
    );

    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("Category", categorySchema);
