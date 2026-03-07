const express = require("express");
const router = express.Router();

const { registerSeller, getSellers } = require("../../controllers/auth/sellerController");
const { handleImageUpload } = require("../../controllers/seller/ProductController");
const { upload } = require("../../helper/cloudinary");

/**
 * @swagger
 * tags:
 *   name: Sellers Auth
 *   description: Seller Authentication APIs
 */
 

/**
 * @swagger
 * /auth/seller/upload-image:
 *   post:
 *     summary: Upload seller document image
 *     tags: [Sellers Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               document:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 */
router.post("/upload-image", upload.single("document"), handleImageUpload);

/**
 * @swagger
 * /auth/seller/register-seller:
 *   post:
 *     summary: Register a new seller
 *     tags: [Sellers Auth]
 *     responses:
 *       200:
 *         description: Seller registered successfully
 */
router.post("/register-seller", registerSeller);

// router.get("/get", getSellers);

module.exports = router;