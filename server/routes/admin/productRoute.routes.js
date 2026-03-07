const express = require("express");

const { upload } = require("../../helper/cloudinary");
const {
  handleImageUpload,
  addProduct,
  editProduct,
  fetchProduct,
  deleteProduct,
} = require("../../controllers/admin/productController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin Products
 *   description: Product APIs
 */

/**
 * @swagger
 * /admin/products/upload-image:
 *   post:
 *     summary: Upload product image
 *   
 *     tags: [Admin Products]
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
 * /admin/products/add:
 *   post:
 *     summary: Add new product
 *
 *     tags: [Admin Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: iPhone 15
 *               description:
 *                 type: string
 *                 example: Latest Apple smartphone
 *               category:
 *                 type: string
 *                 example: electronics
 *               brand:
 *                 type: string
 *                 example: Apple
 *               price:
 *                 type: number
 *                 example: 999
 *               salePrice:
 *                 type: number
 *                 example: 899
 *               totalStock:
 *                 type: number
 *                 example: 100
 *               image:
 *                 type: string
 *                 example: https://res.cloudinary.com/demo/image/upload/sample.jpg
 *     responses:
 *       201:
 *         description: Product created successfully
 */
router.post("/add", addProduct);

/**
 * @swagger
 * /admin/products/edit/{id}:
 *   put:
 *     summary: Edit product
 *    
 *     tags: [Admin Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               salePrice:
 *                 type: number
 *               totalStock:
 *                 type: number
 *     responses:
 *       200:
 *         description: Product updated successfully
 */
router.put("/edit/:id", editProduct);

/**
 * @swagger
 * /admin/products/delete/{id}:
 *   delete:
 *     summary: Delete product
 *     tags: [Admin Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 */
router.delete("/delete/:id", deleteProduct);

/**
 * @swagger
 * /admin/products/get:
 *   get:
 *     summary: Get all products
 *  
 *     tags: [Admin Products]
 *     responses:
 *       200:
 *         description: List of products
 */
router.get("/get", fetchProduct);

module.exports = router;