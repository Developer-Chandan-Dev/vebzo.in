const Product = require("../models/product.model");
const Category = require("../models/category.model");
const asyncHandler = require("../utils/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");
const {
  handleImageUpload,
  safelyDeleteFromCloudinary,
} = require("../helper/cloudinary.helper");

// @desc Create a new product (POST - /api/v1/products/, [Admin])
const createProduct = asyncHandler(async (req, res, next) => {
  try {
    const { name, description, purchasePrice, price, salesPrice, stock, category, isFeatured } = req.body;

    // Validate required fields
    if (!name || !purchasePrice || !price || !stock || !category) {
      return next(
        new ErrorResponse("All required fields must be provided", 400)
      );
    }

    // Create the product
    const product = await Product.create({
      name,
      description,
      purchasePrice,
      price,
      salesPrice,
      stock,
      category,
      isFeatured
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
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const {
      query,
      category,
      minPrice,
      maxPrice,
      inStock,
      sortBy,
      isFeatured,
      bestSellingProducts,
    } = req.query;

    console.log(category);
    const filters = {};

    // Filtering logic
    if (query) {
      filters.$or = [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ];
    }
    if (minPrice) filters.price = { ...filters.price, $gte: minPrice };
    if (maxPrice) filters.price = { ...filters.price, $lte: maxPrice };
    if (inStock === "true") filters.stock = { $gt: 0 };

    // Filter by isFeatured
    if (isFeatured === "true") {
      filters.isFeatured = true;

      // Fetch only 4 featured products and return immediately
      const featuredProducts = await Product.find(filters)
        .sort({ createdAt: -1 }) // Optionally sort by latest
        .limit(4)
        .populate("category", "name");

      return res.status(200).json({
        success: true,
        data: featuredProducts,
        totalProducts: featuredProducts.length,
      });
    }

    // Filter by best selling products
    if (bestSellingProducts === "true") {
      const BSProducts = await Product.find()
        .sort({ sold: -1 }) // Sort by sold in descending order
        .limit(4)
        .populate("category", "name");

      return res.status(200).json({
        success: true,
        data: BSProducts,
        totalProducts: BSProducts.length,
      });
    }

    // Sorting logic
    let sortOption = {};
    if (sortBy) {
      switch (sortBy) {
        case "latest": // Sort by creation date (latest first)
          sortOption = { createdAt: -1 };
          break;
        case "oldest": // Sort by creation date (oldest first)
          sortOption = { createdAt: 1 };
          break;
        case "price-asc": // Sort by price (low to high)
          sortOption = { price: 1 };
          break;
        case "price-desc": // Sort by price (high to low)
          sortOption = { price: -1 };
          break;
        case "name-asc": // Sort alphabetically by name (A-Z)
          sortOption = { name: 1 };
          break;
        case "name-desc": // Sort alphabetically by name (Z-A)
          sortOption = { name: -1 };
          break;
        case "popularity": // Sort by popularity (e.g., purchase count)
          sortOption = { sold: -1 };
          break;
        case "average-rating": // Sort by average rating (highest first)
          sortOption = { averageRating: -1 };
          break;
        default: // Default to latest products
          sortOption = { createdAt: -1 };
      }
    } else {
      // Default sort option (latest products)
      sortOption = { createdAt: -1 };
    }

    // Filter by category
    // if (category) filters.category = { ...filters.category, $eq: category };
    // console.log(filters);

    const totalProducts = await Product.countDocuments(filters);
    const totalPages = Math.ceil(totalProducts / limit);

    // Fetch paginated, filtered, and sorted data
    const products = await Product.find(filters)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("category", "name");

    res.status(200).json({
      success: true,
      data: products,
      totalPages,
      totalProducts,
    });
  } catch (error) {
    console.log(error);
    return next(new ErrorResponse("Internal Server Error", 500));
  }
});

// @desc Get a product by Id (GET - /api/v1/products/:id, [Public])
const getProductById = asyncHandler(async (req, res, next) => {
  try {
    const productId = req.params.id;

    // Find the product and increment the views
    const product = await Product.findByIdAndUpdate(
      productId,
      { $inc: { views: 1 } }, // Increment the views by 1
      { new: true } // Return the updated product
    ).populate("category", "name");


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
    const { name, description, purchasePrice, price, salesPrice, stock, category, isFeatured } = req.body;
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
      ...(purchasePrice && { purchasePrice }),
      ...(price && { price }),
      ...(salesPrice > 0 && { salesPrice }),
      ...(stock && { stock }),
      ...(category && { category }),
      ...(isFeatured && { isFeatured }),
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
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;

    const { query, minPrice, maxPrice, inStock, sortBy } = req.query;

    const filters = {};

    // Filtering logic
    if (query) {
      filters.$or = [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ];
    }
    if (minPrice) filters.price = { ...filters.price, $gte: minPrice };
    if (maxPrice) filters.price = { ...filters.price, $lte: maxPrice };
    if (categoryId) filters.category = { ...filters.category, $eq: categoryId };
    if (inStock === "true") filters.stock = { $gt: 0 };

    // Sorting logic
    let sortOption = {};
    if (sortBy) {
      switch (sortBy) {
        case "latest": // Sort by creation date (latest first)
          sortOption = { createdAt: -1 };
          break;
        case "oldest": // Sort by creation date (oldest first)
          sortOption = { createdAt: 1 };
          break;
        case "price-asc": // Sort by price (low to high)
          sortOption = { price: 1 };
          break;
        case "price-desc": // Sort by price (high to low)
          sortOption = { price: -1 };
          break;
        case "name-asc": // Sort alphabetically by name (A-Z)
          sortOption = { name: 1 };
          break;
        case "name-desc": // Sort alphabetically by name (Z-A)
          sortOption = { name: -1 };
          break;
        case "popularity": // Sort by popularity (e.g., purchase count)
          sortOption = { sold: -1 };
          break;
        case "average-rating": // Sort by average rating (highest first)
          sortOption = { averageRating: -1 };
          break;
        default: // Default to latest products
          sortOption = { createdAt: -1 };
      }
    } else {
      // Default sort option (latest products)
      sortOption = { createdAt: -1 };
    }

    const totalProducts = await Product.countDocuments(filters);
    const totalPages = Math.ceil(totalProducts / limit);

    const category = await Category.findOne({ _id: categoryId });

    const products = await Product.find(filters)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("category", "name description");

    res.status(200).json({
      success: true,
      data: products,
      totalPages,
      totalProducts,
      category,
    });
  } catch (error) {
    console.log(error);
    return next(new ErrorResponse("Internal Server Error", 500));
  }
});

// Most viewed products
const getMostViewedProduct = asyncHandler(async (req, res, next) => {
  try {
    const mostViewedProduct = await Product.find({})
      .sort({ views: -1 }) // Sort by views in descending order
      .limit(1) // Get the top product
      .select("name views"); // Only fetch the required fields

    res.status(200).json({
      success: true,
      data: mostViewedProduct[0] || { name: "N/A", views: 0 },
    });
  } catch (error) {
    console.error(error);
    return next(new ErrorResponse("Failed to fetch most-viewed product", 500));
  }
});

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  productImageUpload,
  productsByCategory,
  getMostViewedProduct,
};
