const express = require("express");
const router = express.Router();
const upload = require("../middlewares/fileUploadMiddleware");

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  searchAndFilterProducts,
  searchProducts,
  filterProducts,
  productImageUpload,
  productsByCategory
} = require("../controller/productController");
const { protect, admin } = require("../middlewares/authMiddleware");

// Validation/Middlewares imports
const validate = require("../middlewares/validation.middleware");
const {
  createProductValidationSchema,
  updateProductValidationSchema,
} = require("../validations/validateProduct");

// <===== Product Routes =========>

// Create a new product (Admin)
router.post("/", protect, admin, validate(createProductValidationSchema), createProduct); 

// Product image upload/update (Admin)
router.put("/:productId/image", protect, admin, upload.single("imageUrl"), productImageUpload);

// Get all products (Public)
router.get("/", getProducts); 

// Get a product by ID (Public)
router.get("/details/:id", getProductById); 

// Update product details (Admin)
router.put("/:id", protect, admin, validate(updateProductValidationSchema), updateProduct);

// Delete a product (Admin)
router.delete("/:id", protect, admin, deleteProduct); 

// Get products by category
router.get("/category/:categoryId", productsByCategory)

// Search products ( Public )
router.get("/search/search", searchProducts);

// Filter products ( Public )
router.get("/filter/filter", filterProducts);

module.exports = router;
