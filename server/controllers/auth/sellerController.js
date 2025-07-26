const bcrypt = require("bcryptjs");
const UserModel = require("../../models/UserModel");
const SellerModel = require("../../models/SellerModel");

const registerSeller = async (req, res) => {
  try {
    const {
      username,
      email,
      phone,
      password,
      storename,
      gstno,
      businesstype,
      bankaccount,
      ifsccode,
      document,
      address,
    } = req.body;

    if (
      !username ||
      !email ||
      !phone ||
      !password ||
      !storename ||
      !businesstype ||
      !bankaccount ||
      !ifsccode ||
      !document 
      
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields.",
      });
    }

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email is alredy registered!",
      });
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const newUser = new UserModel({
      username,
      email,
      password: hashPassword,
      role: "seller",
      phone
    });

    const savedUser = await newUser.save();
    console.log("Saved User:", savedUser);

    // for seller profile
    const seller = new SellerModel({
      userId: savedUser._id,
      // bussinessname: storename,
      storename,
      gstno,
      businesstype,
      bankaccount,
      ifsccode,
      document,
      address,
    });
    const savedSeller = await seller.save();
    console.log("Saved Seller:", savedSeller);
    console.log("saved user", savedUser);

    console.log("Document URL:", document);
    res.status(200).json({
      success: true,
      data: seller,
      user: {
        _id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
        role: savedUser.role,
        phone:savedUser.phone
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

module.exports = { registerSeller };
