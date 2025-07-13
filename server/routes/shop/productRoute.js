const express = require("express");
const {
  getFilteredProducts,
  getProductDetails,
} = require("../../controllers/shop/ProductController");

const router = express.Router();

// GET /api/shop/products/get?brand=puma&category=shoes
router.get("/get", getFilteredProducts);
router.get("/get/:id", getProductDetails);

module.exports = router;
