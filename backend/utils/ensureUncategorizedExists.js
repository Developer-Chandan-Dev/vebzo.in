const Category = require("../models/category.model");

const ensureUncategorizedExists = async () => {
  let uncategorized = await Category.findOne({ name: "Uncategorized" });

  if (!uncategorized) {
    uncategorized = new Category({
      name: "Uncategorized",
      description: "Default category",
    });
    await uncategorized.save();
  }

  return uncategorized;
};

// Ensure correct export
module.exports = ensureUncategorizedExists;
