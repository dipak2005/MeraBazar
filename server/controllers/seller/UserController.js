const UserModel = require("../../models/UserModel");
const SellerModel = require("../../models/SellerModel");

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await UserModel.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found!",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

const getSpecificSellerInfo = async (req, res) => {
  const { email } = req.query;
  console.log(email, "email");
  try {
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required in query params",
      });
    }

    const user = await UserModel.findOne({ email });

    if (!user || user.role !== "seller") {
      return res.status(404).json({
        success: false,
        message: "Seller not found or user is not a seller",
      });
    }
    console.log(user);

    const seller = await SellerModel.findOne({ userId: user?.id });

    if (!seller) {
      return res.status(404).json({
        success: false,
        message: "Seller details not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        userinfo: user,
        sellerinfo: seller,
      },
    });
  } catch (error) {
    console.log(" Error fetching seller info:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = { getUserById, getSpecificSellerInfo };
