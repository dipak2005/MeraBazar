const express = require("express");
const {
  getAllOrdersofAllUsers,
  getOrderDetailsForSeller,
  updateOrderStatus,
  getOrdersBySellerId,
} = require("../../controllers/seller/OrderController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Seller Orders
 *   description: Seller Order Management APIs
 */

/**
 * @swagger
 * /seller/orders/get:
 *   get:
 *     summary: Get all orders of all users
 *     tags: [Seller Orders]
 *     responses:
 *       200:
 *         description: List of all orders
 */
router.get("/get", getAllOrdersofAllUsers);

/**
 * @swagger
 * /seller/orders/details/{id}:
 *   get:
 *     summary: Get order details for seller
 *     tags: [Seller Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Order ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order details
 */
router.get("/details/:id", getOrderDetailsForSeller);

/**
 * @swagger
 * /seller/orders/update/{id}:
 *   put:
 *     summary: Update order status
 *     tags: [Seller Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Order ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order status updated successfully
 */
router.put("/update/:id", updateOrderStatus);

/**
 * @swagger
 * /seller/orders/{sellerId}:
 *   get:
 *     summary: Get orders by seller ID
 *     tags: [Seller Orders]
 *     parameters:
 *       - in: path
 *         name: sellerId
 *         required: true
 *         description: Seller ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Orders of specific seller
 */
router.get("/:sellerId", getOrdersBySellerId);

module.exports = router;