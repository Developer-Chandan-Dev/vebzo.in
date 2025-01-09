const express = require("express");
const router = express.Router();

const {
  addReview,
  getProductReviews,
  deleteReview,
  updateReview,
} = require("../controller/reviewController");
const { protect } = require("../middlewares/authMiddleware");
const validate = require("../middlewares/validation.middleware");
const {
  validateReview,
  validateReviewUpdate,
} = require("../validations/validateReview");

// Add a new review
router.post("/", protect, validate(validateReview), addReview);

// Get all reviews for a product
router.get("/:productId", getProductReviews);

// Update existing review
router.put(
  "/reviews/:reviewId",
  protect,
  validate(validateReviewUpdate),
  updateReview
);

// Delete a review
router.delete("/:id", protect, deleteReview);

module.exports = router;
