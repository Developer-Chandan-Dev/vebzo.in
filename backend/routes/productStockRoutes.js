const express = require("express");
const router = express.Router();

const {
  updateStock,
  getProductStock,
} = require("../controller/productStockController");

router.put("/update-stock", updateStock);
router.get("/product-stock/:id", getProductStock);

module.exports = router;
