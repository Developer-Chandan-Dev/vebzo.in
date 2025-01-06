const Cart = require("../models/cart.models");

const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      cart = new Cart({ user: req.user.id, cartItems: [] });
    }

    const existingItem = cart.cartItems.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.cartItems.push({ product: productId, quantity });
    }

    await cart.save();
    res
      .status(200)
      .json({ success: true, message: "Product added/updated in cart" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const removeFromCart = async (req, res) => {
  const { productId } = req.params;

  try {
    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    cart.cartItems = cart.cartItems.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();
    res
      .status(200)
      .json({ success: true, message: "Product removed from cart" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const updateCartItem = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    const item = cart.cartItems.find(
      (item) => item.product.toString() === productId
    );

    if (item) {
      item.quantity = quantity;
      await cart.save();
      return res
        .status(200)
        .json({ success: true, message: "Cart item updated" });
    }

    res.status(404).json({ success: false, message: "Item not found in cart" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate(
      "cartItems.product"
    );

    if (!cart) {
      return res.status(200).json({ success: true, cartItems: [] });
    }

    res.status(200).json({ success: true, data: cart.cartItems });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = { addToCart, removeFromCart, updateCartItem, getCart };
