const Category = require("../models/category.model");

// @desc Create a new category
// @route PORT /api/v1/category
// @access Admin
const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    const category = await Category.findOne({ name: name });
    if (category) {
      return res
        .status(400)
        .json({ success: false, message: "Category already added" });
    }

    const newCategory = new Category({ name, description });

    await newCategory.save();
    res
      .status(201)
      .json({ success: true, message: "Category Added", data: newCategory });
    res.status();
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// @desc Get all categories
// @route GET /api/v1/categories
// @access Public
const getCategories = async (req, res) => {
  try {
    const category = await Category.find();
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// @desc Get a single category by ID
// @route GET /api/v1/category/:ID
// @access Public
const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    res.status(200).json({ success: true, data: category });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// @desc Update a Category
// @route PUT /api/v1/catgory/:id
// @access Admin
const updateCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
      },
      { new: true, runValidators: true }
    );

    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    res.status(200).json({
      success: true,
      data: category,
      message: "Category updated successfully!",
    });
  } catch (error) {
    console.log(error);
    res.stauts(500).json({ success: false, message: "Internal Server error" });
  }
};

// @desc Delete a category
// @route DELETE /api/v1/category/:id
// @access Admin
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found " });
    }

    res
      .status(200)
      .json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: " Internal Server Error" });
  }
};

module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
