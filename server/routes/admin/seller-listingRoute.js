const express = require("express");
const {
  getAllSellers,
  getSellerDetails,
  updateSellerApprovalStatus,getSellerBussinessDetails
} = require("../../controllers/admin/SellerListingController");

const router = express.Router();

router.get("/get", getAllSellers);
router.get("/details/:id", getSellerDetails);
// router.get("/sellerdetail/:id",getSellerDetails);
router.put("/update/:id",updateSellerApprovalStatus);

module.exports = router;
