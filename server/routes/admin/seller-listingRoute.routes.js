const express = require("express");
const {
  getAllSellers,
  getSellerDetails,
  updateSellerApprovalStatus,
  getSellerBussinessDetails
} = require("../../controllers/admin/SellerListingController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Sellers Listing
 *   description: Seller Management APIs
 */

/**
 * @swagger
 * /auth/sellerlist/get:
 *   get:
 *     summary: Get all sellers
 *     tags: [Sellers Listing]
 *     responses:
 *       200:
 *         description: List of all sellers
 */
router.get("/get", getAllSellers);

/**
 * @swagger
 * /auth/sellerlist/details/{id}:
 *   get:
 *     summary: Get seller details by ID
 *     tags: [Sellers Listing]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Seller ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Seller details
 */
router.get("/details/:id", getSellerDetails);

/**
 * @swagger
 * /auth/sellerlist/update/{id}:
 *   put:
 *     summary: Update seller approval status
 *     tags: [Sellers Listing]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Seller ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Seller status updated successfully
 */
router.put("/update/:id", updateSellerApprovalStatus);

module.exports = router;