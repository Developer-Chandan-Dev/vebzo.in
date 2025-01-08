const express = require("express");
const router = express.Router();

const {
  addReview,
  getProductReviews,
  deleteReview,
} = require("../controller/reviewController");
const { protect } = require("../middlewares/authMiddleware");
const validate = require("../middlewares/validation.middleware");
const validateReview = require("../validations/validateReview");

// Add a new review
router.post("/", protect, validate(validateReview), addReview);

// Get all reviews for a product
router.get("/:productId", getProductReviews);

// Delete a review
router.delete("/:id", protect, deleteReview);

module.exports = router;
