const Product = require("../models/product.model");

// Update stock for a product
const updateStock = async (req, res) => {
  try {
    const { productId, stock } = req.body;

    // Find the product and update its stock
    const product = await Product.findById(productId);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    product.stock = stock; // Update stock value
    await product.save();

    res
      .status(200)
      .json({ success: true, message: "Stock updated successfully", product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Decrease stock and increase sold
const decreaseStock = async (orderItems) => {
  for (const item of orderItems) {
    const product = await Product.findById(item.product);

    if (product) {
      product.stock -= item.quantity; // Decrease stock
      product.sold += item.quantity; // Increase sold
      await product.save();
    }
  }
};

const validateStock = async (orderItems) => {
  for (const item of orderItems) {
    const product = await Product.findById(item.product);

    if (!product || product.stock < item.quantity) {
      throw new Error(`Insufficient stock for product: ${product.name}`);
    }
  }
};

const getProductStock = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findById({ _id: productId });
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({
      productId: product._id,
      name: product.name,
      stock: product.stock,
      sold: product.sold,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const checkLowStock = async () => {
  const lowStockProducts = await Product.find({ stock: { $lte: 5 } });

  if (lowStockProducts.length > 0) {
    console.log(
      "Low stock alert for the following products:",
      lowStockProducts
    );
    // You can integrate email/SMS alerts here
  }
};

module.exports = {
  updateStock,
  decreaseStock,
  validateStock,
  getProductStock,
};
