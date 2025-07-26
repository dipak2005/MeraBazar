const SellerModel = require("../../models/SellerModel");
const UserModel = require("../../models/UserModel");

const getAllSellers = async (req, res) => {
  try {
    const sellers = await SellerModel.find({});

    if (!sellers || sellers.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Sellers found!",
      });
    }

    res.status(200).json({
      success: true,
      data: sellers,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const getSellerDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const seller = await SellerModel.findById(id).populate(
      "userId",
      "username email phone role"
    );
    // .select("-password");

    if (!seller) {
      return res.status(404).json({
        success: false,
        message: "Seller not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        ...seller._doc,
        user: seller.userId,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const getSellerBussinessDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const bussiness = await SellerModel.findById(id);

    if (!bussiness) {
      return res.status(404).json({
        success: false,
        message: "Seller not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: bussiness,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const updateSellerApprovalStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { approvalstatus, isapproved } = req.body;

    const seller = await SellerModel.findById(id);

    if (!seller) {
      return res.status(404).json({
        success: false,
        message: "Seller not found!",
      });
    }

    await SellerModel.findByIdAndUpdate(id, { approvalstatus, isapproved });

    res.status(200).json({
      success: true,
      message: "Seller Status updated Successfully!",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  getAllSellers,
  updateSellerApprovalStatus,
  getSellerDetails,
};
