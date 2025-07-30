const express = require("express");

const {
  addToWishList,
  getWishList,
  deleteWishList,
} = require("../../controllers/shop/wishlistController");

const router = express.Router();

router.post("/add", addToWishList);
router.get("/get/:userId", getWishList);
router.delete("/:userId/:productId", deleteWishList);

module.exports = router;



