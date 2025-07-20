const AddressModel = require("../../models/UserAddressModel");

//  Add Address
const addAddress = async (req, res) => {
  try {
    const { userId, address, city, pincode, phone, notes ,place } = req.body;

    if (!userId || !address || !city || !pincode || !notes || !phone) {
      return res.status(400).json({
        success: false,
        message: "Invalid data Provided!",
      });
    }

    const newAddress = new AddressModel({
      userId,
      
      address,
      city,
      pincode,
      notes,
      phone,
      place
    });

    await newAddress.save();

    return res.status(200).json({
      success: true,
      data: newAddress,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// get All Address
const fetchAllAddress = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId is required!",
      });
    }

    const addressList = await AddressModel.find({ userId });

    return res.status(200).json({
      success: true,
      data: addressList,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// edit Address
const editAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const formData = req.body;

    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "userId and addressID is required!",
      });
    }

    const address = await AddressModel.findOneAndUpdate(
      {
        _id: addressId,
        userId,
      },
      formData,
      { new: true }
    );

    if (!address) {
      return res.status(400).json({
        success: false,
        message: "Address not Found!",
      });
    }

    return res.status(200).json({
      success: true,
      data: address,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// delete Address
const deleteAddress = async (req, res) => {
  try {

    const {userId ,addressId} = req.params;

    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "userId and addressID is required!",
      });
    }

    const address = await AddressModel.findOneAndDelete({_id:addressId,userId});

    if (!address) {
      return res.status(400).json({
        success: false,
        message: "Address not Found!",
      });
    }

    res.status(200).json({
        success:true,
        message:"Address deleted successfully!",
    })

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = { addAddress, fetchAllAddress, editAddress, deleteAddress };
