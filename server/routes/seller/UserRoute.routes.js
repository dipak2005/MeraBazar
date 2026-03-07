const express = require("express");
const { getUserById, getSpecificSellerInfo } = require("../../controllers/seller/UserController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Sellers
 *     description: APIs for retrieving seller-specific data
 *   - name: Users
 *     description: APIs for retrieving user data
 */

/**
 * @swagger
 * /auth/user/seller-info:
 *   get:
 *     summary: Get specific seller info by email
 *     tags:
 *       - Sellers
 *     parameters:
 *       - in: query
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: The email address of the seller
 *         example: seller@example.com
 *     responses:
 *       200:
 *         description: Seller information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *       404:
 *         description: Seller not found
 */
router.get("/seller-info", getSpecificSellerInfo);

/**
 * @swagger
 * /auth/user/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique User ID
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *       404:
 *         description: User not found
 */
router.get("/:id", getUserById);

module.exports = router;