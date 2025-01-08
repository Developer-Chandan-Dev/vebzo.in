const Product = require("../models/product.model");
const asyncHandler = require("../utils/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");
const {
  handleImageUpload,
  safelyDeleteFromCloudinary,
} = require("../helper/cloudinary.helper");

const {
  uploadToCloudinary,
  deleteFromCloudinary,
} = require("../service/uploadToCloudinary.service");

// @desc Create a new product
// @route POST /api/v1/products
// @access Admin

const createProduct = asyncHandler(async (req, res, next) => {
  try {
    const { name, description, price, stock, category } = req.body;

    // Validate required fields
    if (!name || !price || !stock || !category) {
      return next(
        new ErrorResponse("All required fields must be provided", 400)
      );
    }

    let imageUrl = null;
    let imageUrlPublicId = null;

    // Handle image upload if provided
    if (req.file) {
      const uploadResult = await uploadToCloudinary(
        req.file.path, // Path to the uploaded file
        "products", // Cloudinary folder
        `products/${name}_${Date.now()}` // Image name
      );
      imageUrl = uploadResult.secure_url;
      imageUrlPublicId = uploadResult.public_id;
    }

    // Create the product
    const product = await Product.create({
      name,
      description,
      price,
      stock,
      category,
      imageUrl: imageUrl || null,
      imageUrlPublicId: imageUrlPublicId || null,
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
    const { name, description, price, stock, category } = req.body;
    const newImagePath = req.file?.path; // Path of the uploaded image
    const productId = req.params.id;

    // Find the existing product by ID
    const product = await Product.findById(productId);
    if (!product) {
      return next(new ErrorResponse("Product not found", 404));
    }

    // Handle image upload logic
    const folderName = "products"; // Specify the folder name (e.g., "products")
    const updatedImage = await handleImageUpload(
      product,
      newImagePath,
      name || product.name, // Use the new name if provided; otherwise, use the existing name
      folderName
    );

    // Build the update fields dynamically
    const updatedFields = {
      ...(name && { name }), // Add name only if provided
      ...(description && { description }),
      ...(price && { price }),
      ...(stock && { stock }),
      ...(category && { category }),
      imageUrl: updatedImage.imageUrl, // Always update imageUrl
      imageUrlPublicId: updatedImage.imageUrlPublicId, // Always update imageUrlPublicId
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

// @desc Delete a product
// @route DELETE /api/v1/products/:id
// @access Admin
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
    await product.remove();

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
