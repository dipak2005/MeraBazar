const express = require("express");
const {
  searchProduct,
  searchByImage
} = require("../../controllers/shop/searchController");
const { upload } = require("../../helper/cloudinary");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Search
 *   description: Product search APIs
 */

/**
 * @swagger
 * /shop/product/search/search-product/{keyword}:
 *   get:
 *     summary: Search product by keyword
 *     tags: [Search]
 *     parameters:
 *       - in: path
 *         name: keyword
 *         required: true
 *         description: Product search keyword
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of matched products
 */
router.get("/search-product/:keyword", searchProduct);

/**
 * @swagger
 * /shop/product/search/search-by-image:
 *   post:
 *     summary: Search product by image
 *     tags: [Search]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Matching products found
 */
router.post("/search-by-image", upload.single("image"), searchByImage);

module.exports = router;