const express = require("express");
const router = express.Router();

const {
  addAddress,
  fetchAllAddress,
  editAddress,
  deleteAddress,
} = require("../../controllers/shop/addressController");

/**
 * @swagger
 * tags:
 *   name: Address
 *   description: Address APIs
 */

/**
 * @swagger
 * /shop/address/add:
 *   post:
 *     summary: Add new address
 *     tags: [Address]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               address:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               pincode:
 *                 type: string
 *     responses:
 *       201:
 *         description: Address added successfully
 */
router.post("/add", addAddress);

/**
 * @swagger
 * /shop/address/get/{userId}:
 *   get:
 *     summary: Get all addresses of a user
 *     tags: [Address]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of addresses
 */
router.get("/get/:userId", fetchAllAddress);

/**
 * @swagger
 * /shop/address/delete/{userId}/{addressId}:
 *   delete:
 *     summary: Delete user address
 *     tags: [Address]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: addressId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Address deleted successfully
 */
router.delete("/delete/:userId/:addressId", deleteAddress);

/**
 * @swagger
 * /shop/address/update/{userId}/{addressId}:
 *   put:
 *     summary: Update user address
 *     tags: [Address]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: addressId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               address:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               pincode:
 *                 type: string
 *     responses:
 *       200:
 *         description: Address updated successfully
 */
router.put("/update/:userId/:addressId", editAddress);

module.exports = router;