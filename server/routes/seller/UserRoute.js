const express = require("express");

const {getUserById, getSpecificSellerInfo} = require("../../controllers/seller/UserController");


const router = express.Router();

router.get("/seller-info",getSpecificSellerInfo);
router.get("/:id",getUserById);



module.exports = router;
