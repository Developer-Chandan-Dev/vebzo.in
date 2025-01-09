const Product = require("../models/product.model");
const asyncHandler = require("../utils/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");
const {
  handleImageUpload,
  safelyDeleteFromCloudinary,
} = require("../helper/cloudinary.helper");

// @desc Create a new product (POST - /api/v1/products/, [Admin])
const createProduct = asyncHandler(async (req, res, next) => {
  try {
    const { name, description, price, stock, category } = req.body;
    console.log(name, description, price, stock, category);

    // Validate required fields
    if (!name || !price || !stock || !category) {
      return next(
        new ErrorResponse("All required fields must be provided", 400)
      );
    }

    // Create the product
    const product = await Product.create({
      name,
      description,
      price,
      stock,
      category,
    });

    // Return response
    res.status(201).json({
      success: true,
      message: "Product created successfully!",
      data: product,
    });
  } catch (error) {
    console.error(error);
    return next(new ErrorResponse("Internal Server Error", 500));
  }
});

// @desc Update all products (PUT - /api/v1/products/productId/image, [Admin])
const productImageUpload = asyncHandler(async (req, res, next) => {
  try {
    const productId = req.params.productId; // Get product ID from route parameters
    const newImagePath = req.file?.path; // Path of the uploaded image from Multer
    console.log(newImagePath, req.file);
    // Find the product in the database
    const product = await Product.findById(productId);
    if (!product) {
      return next(new ErrorResponse("Product not found", 404));
    }

    // If a new image is provided, upload it to Cloudinary
    let uploadResult = await handleImageUpload(
      product,
      newImagePath, // Path to the uploaded file
      product.name,
      "products" // Cloudinary folder
    );

    console.log(uploadResult, "77");
    // Update the product with new image details
    if (uploadResult) {
      product.imageUrl = uploadResult.imageUrl; // New image URL
      product.imageUrlPublicId = uploadResult.imageUrlPublicId; // New image public ID
    }

    // Save the updated product in the database
    await product.save();

    // Respond with the updated product
    res.status(200).json({
      success: true,
      message: "Product image uploaded successfully",
      data: product,
    });
  } catch (error) {
    console.error(error);
    return next(new ErrorResponse("Failed to upload product image", 500));
  }
});

// @desc Get all products (GET - /api/v1/products/, [Public])
const getProducts = asyncHandler(async (req, res, next) => {
  try {
    const products = await Product.find().populate("category", "name");
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log(error);
    return next(new ErrorResponse("Internal Server Error", 500));
  }
});

// @desc Get a product by Id (GET - /api/v1/products/:id, [Public])
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

// @desc Update a product (PUT - /api/v1/products/:id, [Admin])
const updateProduct = asyncHandler(async (req, res, next) => {
  try {
    const { name, description, price, stock, category } = req.body;
    const productId = req.params.id;

    // Find the existing product by ID
    const product = await Product.findById(productId);
    if (!product) {
      return next(new ErrorResponse("Product not found", 404));
    }

    // Build the update fields dynamically
    const updatedFields = {
      ...(name && { name }), // Add name only if provided
      ...(description && { description }),
      ...(price && { price }),
      ...(stock && { stock }),
      ...(category && { category }),
    };

    // Update the product with the new fields
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updatedFields,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: updatedProduct,
      message: "Product updated successfully!",
    });
  } catch (error) {
    console.error(error);
    return next(new ErrorResponse("Internal Server Error", 500));
  }
});

// @desc Delete a product (DELETE - /api/v1/products/:id, [Admin])
const deleteProduct = asyncHandler(async (req, res, next) => {
  try {
    // Fetch the product by ID
    const product = await Product.findById(req.params.id);

    // If the product does not exist, return a 404 error
    if (!product) {
      return next(new ErrorResponse("Product not found", 404));
    }

    // Delete the image from Cloudinary if it exists
    if (product.imageUrlPublicId) {
      await safelyDeleteFromCloudinary(product.imageUrlPublicId);
    }

    // Delete the product from the database
    await Product.findByIdAndDelete(req.params.id); // Use findByIdAndDelete to delete the product

    // Respond with a success message
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return next(new ErrorResponse("Internal Server Error", 500));
  }
});

// @desc GET products by category (GET - /api/v1/products/:id, [Public])
const productsByCategory = asyncHandler(async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;

    const products = await Product.find({ category: categoryId }).populate(
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

// desc Search functionality (GET - /api/v1/products/search [Public])
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
  productImageUpload,
  filterProducts,
  productsByCategory,
};
