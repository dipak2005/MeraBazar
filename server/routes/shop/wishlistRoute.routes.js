const express = require("express");

const {
  addToWishList,
  getWishList,
  deleteWishList,
} = require("../../controllers/shop/wishlistController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Wishlist
 *   description: Wishlist APIs
 */

/**
 * @swagger
 * /shop/account/wishlist/add:
 *   post:
 *     summary: Add product to wishlist
 *     tags: [Wishlist]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               productId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product added to wishlist successfully
 */
router.post("/add", addToWishList);

/**
 * @swagger
 * /shop/account/wishlist/get/{userId}:
 *   get:
 *     summary: Get wishlist items of a user
 *     tags: [Wishlist]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Wishlist items fetched successfully
 */
router.get("/get/:userId", getWishList);

/**
 * @swagger
 * /shop/account/wishlist/{userId}/{productId}:
 *   delete:
 *     summary: Remove product from wishlist
 *     tags: [Wishlist]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product removed from wishlist successfully
 */
router.delete("/:userId/:productId", deleteWishList);

module.exports = router;