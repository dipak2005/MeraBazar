const express = require("express");
const router = express.Router();

const {
 addBannerImage,
 getBannerImage,
 deleteBannerImage
} = require("../../controllers/common/BannerController");


router.post("/add",addBannerImage);
router.get("/get",getBannerImage);
router.delete("/delete/:id",deleteBannerImage);


module.exports = router;