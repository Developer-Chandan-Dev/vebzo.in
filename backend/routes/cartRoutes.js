const express = require("express");
const router = express.Router();

const {
  addToCart,
  removeFromCart,
  updateCartItem,
  getCart,
} = require("../controller/cartController");
const { protect } = require("../middlewares/authMiddleware");

// Validation imports
const validate = require("../middlewares/validation.middleware");
const {
  cartValidationSchema,
  updateCartValidationSchema,
} = require("../validations/validateCart");

// Cart Routes
router.post("/", protect, validate(cartValidationSchema), addToCart); // Adds a product to the cart or updates its quantity.
router.delete("/:productId", protect, removeFromCart); // Remove a product from the cart.
router.put("/", protect, validate(updateCartValidationSchema), updateCartItem); // Updates the quantity of a product in the cart.
router.get("/", protect, getCart); // Fetches all items in the user's cart.

module.exports = router;
