const express = require("express");

const { upload } = require("../../helper/cloudinary");
const {
  handleImageUpload,
  addProduct,
  editProduct,
  fetchProduct,
  deleteProduct,
} = require("../../controllers/seller/ProductController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Seller Products
 *   description: APIs for seller product management
 */

/**
 * @swagger
 * /seller/products/upload-image:
 *   post:
 *     summary: Upload product image
 *     tags: [Seller Products]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               my_file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 */
router.post("/upload-image", upload.single("my_file"), handleImageUpload);

/**
 * @swagger
 * /seller/products/add:
 *   post:
 *     summary: Add a new product
 *     tags: [Seller Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Product added successfully
 */
router.post("/add", addProduct);

/**
 * @swagger
 * /seller/products/edit/{id}:
 *   put:
 *     summary: Edit product
 *     tags: [Seller Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product updated successfully
 */
router.put("/edit/:id", editProduct);

/**
 * @swagger
 * /seller/products/delete/{id}:
 *   delete:
 *     summary: Delete product
 *     tags: [Seller Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 */
router.delete("/delete/:id", deleteProduct);

/**
 * @swagger
 * /seller/products/get/{sellerId}:
 *   get:
 *     summary: Get products by seller ID
 *     tags: [Seller Products]
 *     parameters:
 *       - in: path
 *         name: sellerId
 *         required: true
 *         description: Seller ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of products
 */
router.get("/get/:sellerId", fetchProduct);

module.exports = router;