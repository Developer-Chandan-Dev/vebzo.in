const express = require("express");
const router = express.Router();
const upload = require("../middlewares/fileUploadMiddleware");

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  productImageUpload,
  productsByCategory,
} = require("../controller/productController");
const { protect, admin, checkRole } = require("../middlewares/authMiddleware");

// Validation/Middlewares imports
const validate = require("../middlewares/validation.middleware");
const {
  createProductValidationSchema,
  updateProductValidationSchema,
} = require("../validations/validateProduct");

// <===== Product Routes =========>

// Create a new product (Admin)
router.post(
  "/",
  protect,
  checkRole("admin", "manager"),
  validate(createProductValidationSchema),
  createProduct
);

// Product image upload/update (Admin)
router.put(
  "/:productId/image",
  protect,
  checkRole("admin", "manager"),
  upload.single("imageUrl"),
  productImageUpload
);

// Get all products (Public)
router.get("/", getProducts);

// Get a product by ID (Public)
router.get("/details/:id", getProductById);

// Update product details (Admin)
router.put(
  "/:id",
  protect,
  checkRole("admin", "manager"),
  validate(updateProductValidationSchema),
  updateProduct
);

// Delete a product (Admin)
router.delete("/:id", protect, checkRole("admin", "manager"), deleteProduct);

// Get products by category
router.get("/category/:categoryId", productsByCategory);

module.exports = router;
