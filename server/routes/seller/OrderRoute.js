const express = require("express");
const {
  getAllOrdersofAllUsers,
  getOrderDetailsForSeller,
  updateOrderStatus
} = require("../../controllers/seller/OrderController");

const router = express.Router();

router.get("/get", getAllOrdersofAllUsers);
router.get("/details/:id", getOrderDetailsForSeller);
router.put("/update/:id",updateOrderStatus);

module.exports = router;
