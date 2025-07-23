const express = require("express");

const {getUserById} = require("../../controllers/seller/UserController");


const router = express.Router();


router.get("/:id",getUserById);


module.exports = router;
