const express = require("express");
const router = express.Router();

const {
  addToCart,
  updateCartItemQty,
  deleteCartItem,
  fetchCartItems
} = require("../controller/cartController");
const { protect } = require("../middlewares/authMiddleware");

// Validation imports
const validate = require("../middlewares/validation.middleware");
const {
  cartValidationSchema,
  updateCartValidationSchema,
} = require("../validations/validateCart");

// Cart Routes
router.post("/", protect, addToCart); // Adds a product to the cart or updates its quantity.
router.delete("/:userId/:productId", protect, deleteCartItem); // Remove a product from the cart.
router.put("/update-cart", protect, updateCartItemQty); // Updates the quantity of a product in the cart.
router.get("/:userId", protect, fetchCartItems); // Fetches all items in the user's cart.

module.exports = router;
