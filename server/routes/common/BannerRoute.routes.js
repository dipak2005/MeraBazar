const express = require("express");
const router = express.Router();

const {
  addBannerImage,
  getBannerImage,
  deleteBannerImage
} = require("../../controllers/common/BannerController");

/**
 * @swagger
 * tags:
 *   name: Banners 
 *   description: Banner APIs
 */

/**
 * @swagger
 * /common/banner/add:
 *   post:
 *     summary: Add new banner image
 *     tags: [Banners]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 example: https://example.com/banner.jpg
 *               title:
 *                 type: string
 *                 example: Summer Sale
 *     responses:
 *       201:
 *         description: Banner added successfully
 */
router.post("/add", addBannerImage);

/**
 * @swagger
 * /common/banner/get:
 *   get:
 *     summary: Get all banner images
 *     tags: [Banners]
 *     responses:
 *       200:
 *         description: List of banners
 */
router.get("/get", getBannerImage);

/**
 * @swagger
 * /common/banner/delete/{id}:
 *   delete:
 *     summary: Delete banner by id
 *     tags: [Banners]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Banner ID
 *     responses:
 *       200:
 *         description: Banner deleted successfully
 */
router.delete("/delete/:id", deleteBannerImage);

module.exports = router;