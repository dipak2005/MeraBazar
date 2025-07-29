const express = require("express");
const {
 searchProduct
} = require("../../controllers/shop/searchController");

const router = express.Router();


router.get("/search-product/:keyword", searchProduct);


module.exports = router;
