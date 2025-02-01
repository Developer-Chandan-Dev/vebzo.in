const mongoose = require("mongoose");
const Product = require("./product.model");

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
  const categoryId = this.getQuery()._id;
  const uncategorized = await ensureUncategorizedExists();

  // Update all products that use the delete category
  await Product.updateMany(
    { category: categoryId },
    { category: uncategorized }
  );

  next();
});
module.exports = mongoose.model("Category", categorySchema);
