const Category = require("../models/category.model");
const asyncHandler = require("../utils/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");

// @desc Create a new category
// @route PORT /api/v1/category
// @access Admin
const createCategory = asyncHandler(async (req, res, next) => {
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
    return next(new ErrorResponse("Internal Server Error", 500));
  }
});

// @desc Get all categories
// @route GET /api/v1/categories
// @access Public
const getCategories = asyncHandler(async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;

    const { query } = req.query;

    const filters = {};

    // Filtering logic
    if (query) {
      filters.$or = [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ];
    }

    const totalCategories = await Category.countDocuments(filters);
    const totalPages = Math.ceil(totalCategories / limit);

    // Fetch paginated, filtered and sorted data

    // const category = await Category.find(filters)
    //   .skip((page - 1) * limit)
    //   .limit(limit);

    const categories = await Category.aggregate([
      { $match: filters },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "category",
          as: "products",
        },
      },
      {
        $project: {
          name: 1,
          description: 1,
          createdAt: 1,
          productCount: { $size: "$products" },
        },
      },
      { $skip: (page - 1) * limit },
      { $limit: limit },
    ]);
    console.log(categories)

    res
      .status(200)
      .json({ success: true, data: categories, totalCategories, totalPages });
  } catch (error) {
    console.log(error);
    return next(new ErrorResponse("Internal Server Error", 500));
  }
});

// @desc Get a single category by ID
// @route GET /api/v1/category/:ID
// @access Public
const getCategoryById = asyncHandler(async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return next(new ErrorResponse("Category not found", 404));
    }

    res.status(200).json({ success: true, data: category });
  } catch (error) {
    console.log(error);
    return next(new ErrorResponse("Internal Server Error", 500));
  }
});

// @desc Update a Category
// @route PUT /api/v1/catgory/:id
// @access Admin
const updateCategory = asyncHandler(async (req, res, next) => {
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
      return next(new ErrorResponse("Category not found", 404));
    }

    res.status(200).json({
      success: true,
      data: category,
      message: "Category updated successfully!",
    });
  } catch (error) {
    console.log(error);
    return next(new ErrorResponse("Internal Server Error", 500));
  }
});

// @desc Delete a category
// @route DELETE /api/v1/category/:id
// @access Admin
const deleteCategory = asyncHandler(async (req, res, next) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return next(new ErrorResponse("Category not found", 404));
    }

    res
      .status(200)
      .json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    console.log(error);
    return next(new ErrorResponse("Internal Server Error", 500));
  }
});

module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
