const express = require("express");
const router = express.Router();

const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controller/categoryController");
const { protect, admin } = require("../middlewares/authMiddleware");

// Validation imports
const validate = require("../middlewares/validation.middleware");
const {
  createCategoryValidationSchema,
  updateCategoryValidationSchema,
} = require("../validations/validateCategory");

// Routes for category
router.post(
  "/",
  protect,
  admin,
  validate(createCategoryValidationSchema),
  createCategory
); // Create a new category
router.get("/", getCategories); // Get all categories
router.get("/:id", getCategoryById); // Get a category b ID
router.put(
  "/:id",
  protect,
  admin,
  validate(updateCategoryValidationSchema),
  updateCategory
); // Update a Category
router.delete("/:id", protect, admin, deleteCategory); // Delete a category

module.exports = router;
