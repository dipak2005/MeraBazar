const express = require("express");
const { createOrder, capturePayment, getAllOrdersByUser, getOrderDetails } = require("../../controllers/shop/orderController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order APIs
 */

/**
 * @swagger
 * /shop/order/create:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Order created successfully
 */
router.post("/create", createOrder);

/**
 * @swagger
 * /shop/order/capture:
 *   post:
 *     summary: Capture payment for order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: string
 *               paymentId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Payment captured successfully
 */
router.post("/capture", capturePayment);

/**
 * @swagger
 * /shop/order/list/{userId}:
 *   get:
 *     summary: Get all orders of a user
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Orders fetched successfully
 */
router.get("/list/:userId", getAllOrdersByUser);

/**
 * @swagger
 * /shop/order/details/{id}:
 *   get:
 *     summary: Get order details
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Order ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order details fetched successfully
 */
router.get("/details/:id", getOrderDetails);

module.exports = router;