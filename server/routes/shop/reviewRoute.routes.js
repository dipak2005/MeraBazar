const express = require("express");
const {
  addProductReview,
  getProductReview
} = require("../../controllers/shop/reviewController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Product Review APIs
 */

/**
 * @swagger
 * /shop/review/add:
 *   post:
 *     summary: Add product review
 *     tags: [Reviews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               userId:
 *                 type: string
 *               rating:
 *                 type: number
 *               review:
 *                 type: string
 *     responses:
 *       200:
 *         description: Review added successfully
 */
router.post("/add", addProductReview);

/**
 * @swagger
 * /shop/review/{productId}:
 *   get:
 *     summary: Get product reviews
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of product reviews
 */
router.get("/:productId", getProductReview);

module.exports = router;