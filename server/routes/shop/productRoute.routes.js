const express = require("express");
const {
  getFilteredProducts,
  getProductDetails,
} = require("../../controllers/shop/productController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Shop Products
 *   description: Product browsing APIs for users
 */

/**
 * @swagger
 * /shop/products/get:
 *   get:
 *     summary: Get filtered products
 *     tags: [Shop Products]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category
 *       - in: query
 *         name: brand
 *         schema:
 *           type: string
 *         description: Filter by brand
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Sort products (price-low, price-high, newest)
 *     responses:
 *       200:
 *         description: List of filtered products
 */
router.get("/get", getFilteredProducts);

/**
 * @swagger
 * /shop/products/get/{id}:
 *   get:
 *     summary: Get product details
 *     tags: [Shop Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product details fetched successfully
 *       404:
 *         description: Product not found
 */
router.get("/get/:id", getProductDetails);

module.exports = router;