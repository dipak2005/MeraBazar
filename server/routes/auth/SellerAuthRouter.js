const express = require("express");
const router = express.Router();

const { registerSeller } = require("../../controllers/auth/sellerController");
const {
  handleImageUpload,
} = require("../../controllers/seller/ProductController");
const { upload } = require("../../helper/cloudinary");

router.post("/upload-image",upload.single("document"), handleImageUpload);
router.post("/register-seller", registerSeller);

module.exports = router;
