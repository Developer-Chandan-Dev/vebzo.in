const express = require("express");
const router = express.Router();

const {
  addToWishList,
  removeFromWishList,
  getWishlist,
} = require("../controller/wishlistController");
const { protect, admin } = require("../middlewares/authMiddleware");

const validate = require("../middlewares/validation.middleware");
const { wishlistValidationSchema } = require("../validations/validateWishList");

// Wishlist Routes
router.post("/", protect, addToWishList); // Add a product to the user's wishlist
router.delete("/:productId", protect, removeFromWishList); // Removes a product from teh user's wishlist
router.get("/:userId", protect, getWishlist); // Fetches all products in the user's wishlist

module.exports = router;
