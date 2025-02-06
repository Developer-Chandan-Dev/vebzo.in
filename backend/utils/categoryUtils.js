const Category = require("../models/category.model");

const ensureUncategorizedExists = async () => {
  let uncategorized = await Category.findOne({ name: "Uncategorized" });

  if (!uncategorized) {
    uncategorized = await Category.create({ name: "Uncategorized" });
  }

  return uncategorized._id;
};

module.exports = { ensureUncategorizedExists };
