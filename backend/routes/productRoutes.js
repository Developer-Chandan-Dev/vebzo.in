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
} = require("../controller/productController");
const { protect, admin } = require("../middlewares/authMiddleware");

// Product Routes
router.post("/", protect, admin, upload.single("imageUrl"), createProduct); // Create a new product
router.get("/", getProducts); // Get all products
router.get("/:id", getProductById); // Get a product by ID
router.put("/:id", protect, admin, upload.single("imageUrl"), updateProduct); // Update a product
router.delete("/:id", protect, admin, deleteProduct); // Delete a product
router.get("/search/search", searchProducts);
router.get("/filter/filter", searchAndFilterProducts);

module.exports = router;
