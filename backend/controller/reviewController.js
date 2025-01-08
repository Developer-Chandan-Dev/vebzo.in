const Review = require("../models/review.models");
const Product = require("../models/product.model");
const asyncHandler = require("../utils/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");

// Add a new review
exports.addReview = asyncHandler(async (req, res, next) => {
  const { productId, rating, comment } = req.body;
  const userId = req.user.id;

  try {
    // Check if the user has already reviewed this product
    const existingReview = await Review.findOne({ productId, userId });
    if (existingReview) {
      return next(
        new ErrorResponse("You have already reviewed this product", 400)
      );
    }

    // Create a new review
    const review = await Review.create({
      productId,
      userId,
      rating,
      comment,
    });

    console.log(review);
    // Update product rating
    const product = await Product.findById(productId);
    const allReviews = await Review.find({ productId });

    const totalRatings = allReviews.reduce((acc, r) => acc + r.rating, 0);
    const averageRating = totalRatings / allReviews.length;

    product.totalRatings = allReviews.length;
    product.averageRating = averageRating;

    await product.save();

    res.status(201).json({
      success: true,
      message: "Review added successfully",
      data: review,
    });
  } catch (error) {
    console.log(error);
    return next(new ErrorResponse("Internal Server Error", 500));
  }
});

// Get all reviews for a product
exports.getProductReviews = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;

  try {
    const reviews = await Review.find({ productId }).populate("userId", "username");
    res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    console.log(error);
    return next(new ErrorResponse("Internal Server Error", 500));
  }
});

// Delete a review
exports.deleteReview = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const review = await Review.findById(id);
    if (!review) {
      return next(new ErrorResponse("Review not found", 404));
    }

    // Only the user who wrote the review can delete it
    if (review.userId.toString() !== userId) {
      return next(
        new ErrorResponse("You are not authorized to delete this review", 403)
      );
    }

    await Review.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return next(new ErrorResponse("Internal Server Error", 500));
  }
});
