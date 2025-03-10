const Wishlist = require("../models/wishlist.models.js");
const asyncHandler = require("../utils/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");

const addToWishList = asyncHandler(async (req, res, next) => {
  const { productId } = req.body;

  try {
    let wishlist = await Wishlist.findOne({ user: req.user.id });
    if (!wishlist) {
      wishlist = new Wishlist({ user: req.user.id, products: [] });
    }

    if (!wishlist.products.includes(productId)) {
      wishlist.products.push(productId);
      await wishlist.save();
      return res
        .status(200)
        .json({ success: true, message: "Product added to wishlist" });
    }

    res
      .status(400)
      .json({ success: false, message: "Product already in wishlist" });
  } catch (error) {
    console.log(error);
    return next(new ErrorResponse("Internal Server Error", 500));
  }
});

const removeFromWishList = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;

  try {
    const wishlist = await Wishlist.findOne({ user: req.user.id });

    if (!wishlist) {
      return next(new ErrorResponse("Wishlist not found", 404));
    }

    wishlist.products = wishlist.products.filter(
      (product) => product.toString() !== productId
    );

    await wishlist.save();
    res
      .status(200)
      .json({ success: true, message: "Product removed from wishlist" });
  } catch (error) {
    console.log(error);
    return next(new ErrorResponse("Internal Server Error", 500));
  }
});

const getWishlist = asyncHandler(async (req, res, next) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user.id }).populate({
      path: "products",
      select: "imageUrl, name price",
    });

    if (!wishlist) {
      return res.status(200).json({ success: true, products: [] });
    }

    res.status(200).json({ success: true, data: wishlist });
  } catch (error) {
    console.log(error);
    return next(new ErrorResponse("Internal Server Error", 500));
  }
});

module.exports = {
  addToWishList,
  removeFromWishList,
  getWishlist,
};
