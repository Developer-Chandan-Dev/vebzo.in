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
    const reviews = await Review.find({ productId }).populate(
      "userId",
      "username email imageUrl"
    );
    res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    console.log(error);
    return next(new ErrorResponse("Internal Server Error", 500));
  }
});

// Update an existing review
exports.updateReview = asyncHandler(async (req, res, next) => {
  const { reviewId } = req.params; // Review ID from URL parameters
  const { rating, comment } = req.body; // Updated rating and comment from request body
  const userId = req.user.id; // Logged-in user's ID
  const userRole = req.user.role; // Logged-in user's role (e.g., admin or user)

  try {
    // Find the review by ID
    const review = await Review.findById(reviewId);
    if (!review) {
      return next(new ErrorResponse("Review not found", 404));
    }

    // Check if the logged-in user is the owner of the review or an admin
    if (review.userId.toString() !== userId && userRole !== "admin") {
      return next(
        new ErrorResponse("You are not authorized to update this review", 403)
      );
    }

    // Update the review's rating and/or comment
    if (rating) review.rating = rating;
    if (comment) review.comment = comment;

    await review.save();

    // Update the product's average rating and total ratings
    const productId = review.productId;
    const product = await Product.findById(productId);
    const allReviews = await Review.find({ productId });

    const totalRatings = allReviews.reduce((acc, r) => acc + r.rating, 0);
    const averageRating = totalRatings / allReviews.length;

    product.totalRatings = allReviews.length;
    product.averageRating = averageRating;

    await product.save();

    res.status(200).json({
      success: true,
      message: "Review updated successfully",
      data: review,
    });
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
