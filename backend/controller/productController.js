const Product = require("../models/product.model");
const asyncHandler = require("../utils/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");

// @desc Create a new product
// @route PORT /api/v1/products
// @access Admin

const createProduct = asyncHandler(async (req, res, next) => {
  try {
    const { name, description, price, stock, category, imageUrl } = req.body;

    const product = new Product({
      name,
      description,
      price,
      stock,
      category,
      imageUrl,
    });

    const response = await product.save();
    res
      .status(201)
      .json({ success: true, message: "Product Added", data: product });
  } catch (error) {
    console.log(error);
    return next(new ErrorResponse("Internal Server Error", 500));
  }
});

// @desc Get all products
// @route GET /api/v1/products
// @access Public

const getProducts = asyncHandler(async (req, res, next) => {
  try {
    const products = await Product.find().populate("category", "name");
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log(error);
    return next(new ErrorResponse("Internal Server Error", 500));
  }
});

// @desc Get a single product by ID
// @route GET /api/v1/products/:ID
// @access Public

const getProductById = asyncHandler(async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "category",
      "name"
    );

    if (!product) {
      return next(new ErrorResponse("Product not found", 404));
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.log(error);
    return next(new ErrorResponse("Internal Server Error", 500));
  }
});

// @desc Update a product
// @route PUT /api/v1/products/:id
// @access Admin
const updateProduct = asyncHandler(async (req, res, next) => {
  try {
    const { name, description, price, stock, category, imageUrl } = req.body;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        price,
        stock,
        category,
        imageUrl,
      },
      { new: true, runValidators: true }
    );

    if (!product) {
      return next(new ErrorResponse("Product not found", 404));
    }

    res.status(200).json({
      success: true,
      data: product,
      message: "Product updated successfully!",
    });
  } catch (error) {
    console.log(error);
    return next(new ErrorResponse("Internal Server Error", 500));
  }
});

// @desc Delete a product
// @route DELETE /api/v1/products/:id
// @access Admin
const deleteProduct = asyncHandler(async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return next(new ErrorResponse("Product not found", 404));
    }

    res
      .status(200)
      .json({ success: true, messsage: "Product deleted successfully" });
  } catch (error) {
    console.log(error);
    return next(new ErrorResponse("Internal Server Error", 500));
  }
});

// @desc GET products by category
// @route DELETE /api/v1/products/:id
// @access Public
const productsByCategory = asyncHandler(async (req, res, next) => {
  try {
    const products = await Product.findById(req.params.id).populate(
      "category",
      "name description"
    );

    if (!products) {
      return next(new ErrorResponse("Products not found", 404));
    }
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log(error);
    return next(new ErrorResponse("Internal Server Error", 500));
  }
});

// desc Search functionality
// @route GET /api/v1/products/search
// @access Public
const searchProducts = asyncHandler(async (req, res, next) => {
  try {
    const query = req.query.query || "";
    console.log(query);
    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        // { category: { $regex: query, $options: "i" } },
      ],
    });
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log(error);
    return next(new ErrorResponse("Internal Server Error", 500));
  }
});

// desc Filter Functionality
// @route GET /api/v1/products/filter?category=<category>&minPrice=<minPrice>&maxPrice=<maxPrice>&inStock=true
// access Public
const filterProducts = asyncHandler(async (req, res, next) => {
  try {
    const { category, minPrice, maxPrice, inStock } = req.query;
    const filters = {};

    if (category) filters.category = category;
    if (minPrice) filters.price = { ...filters.price, $gte: minPrice };
    if (maxPrice) filters.price = { ...filters.price, $lte: minPrice };
    if (inStock === "true") filters.stock = { $gt: 0 };

    const products = await Product.find(filters);
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log(error);
    return next(new ErrorResponse("Internal Server Error", 500));
  }
});

const searchAndFilterProducts = asyncHandler(async (req, res, next) => {
  try {
    const { query, category, minPrice, maxPrice, inStock } = req.query;

    const filters = {};

    if (query) {
      console.log(query);
      filters.$or = [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
      ];
    }

    if (category) filters.category = category;
    if (minPrice) filters.price = { ...filters.price, $gte: minPrice };
    if (maxPrice) filters.price = { ...filters.price, $lte: maxPrice };
    if (inStock === "true") filters.stock = { $gt: 0 };

    const products = await Product.find(filters);
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log(error);
    return next(new ErrorResponse("Internal Server Error", 500));
  }
});

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  searchAndFilterProducts,
  searchProducts,
  filterProducts,
};
