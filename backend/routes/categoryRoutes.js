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

// Routes for category
router.post("/", protect, admin, createCategory); // Create a new category
router.get("/", getCategories); // Get all categories
router.get("/:id", getCategoryById); // Get a category b ID
router.put("/:id", protect, admin, updateCategory); // Update a Category
router.delete("/:id", protect, admin, deleteCategory); // Delete a category

module.exports = router;
