const express = require("express");
const {
 searchProduct,
 searchByImage
} = require("../../controllers/shop/searchController");
const { upload } = require("../../helper/cloudinary");

const router = express.Router();


router.get("/search-product/:keyword", searchProduct);
router.post("/search-by-image", upload.single("image"), searchByImage);


module.exports = router;
