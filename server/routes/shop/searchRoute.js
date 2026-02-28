const express = require("express");
const {
 searchProduct,
 imageSearch
} = require("../../controllers/shop/searchController");

const router = express.Router();
const multer = require("multer");
const upload = multer();


router.get("/search-product/:keyword", searchProduct);
router.post("/image-search", upload.single("image"), imageSearch);


module.exports = router;
