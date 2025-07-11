const express = require("express");
const router = express.Router();

const {registeredUser,loginUser, logoutUser , authMiddleware} = require("../../controllers/auth/authController");

router.post("/register", registeredUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.get("/check-auth",authMiddleware,(req,res) => {
  const user = req.user;

  res.status(200).json({
    success:true,
    message:"User is Authenticated!",
    user
  })
});

module.exports = router;