const express = require("express");

const { upload } = require("../../helper/cloudinary");
const {
  handleImageUpload,
  addProduct,
  editProduct,
  fetchProduct,
  deleteProduct,
} = require("../../controllers/seller/ProductController");

const router = express.Router();

router.post("/upload-image", upload.single("my_file"), handleImageUpload);
router.post("/add",addProduct);
router.put("/edit/:id",editProduct);
router.delete("/delete/:id",deleteProduct);
router.get("/get",fetchProduct);

module.exports = router;
