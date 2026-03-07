const express = require("express");

const {
  addToCart,
  fetchCartItems,
  updateCartItemQty,
  deleteCartItem,
} = require("../../controllers/shop/cartController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Cart APIs
 */

/**
 * @swagger
 * /shop/cart/add:
 *   post:
 *     summary: Add product to cart
 *     tags: [Cart]
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
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Product added to cart successfully
 */
router.post("/add", addToCart);

/**
 * @swagger
 * /shop/cart/get/{userId}:
 *   get:
 *     summary: Get cart items of a user
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cart items fetched successfully
 */
router.get("/get/:userId", fetchCartItems);

/**
 * @swagger
 * /shop/cart/update-cart:
 *   put:
 *     summary: Update cart item quantity
 *     tags: [Cart]
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
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Cart item updated successfully
 */
router.put("/update-cart", updateCartItemQty);

/**
 * @swagger
 * /shop/cart/{userId}/{productId}:
 *   delete:
 *     summary: Delete product from cart
 *     tags: [Cart]
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
 *         description: Cart item deleted successfully
 */
router.delete("/:userId/:productId", deleteCartItem);

module.exports = router;