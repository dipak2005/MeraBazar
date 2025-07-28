const BannerModel = require("../../models/BannerModel");

const addBannerImage = async (req, res) => {
  try {
    const { image } = req.body;
    const bannerImages = new BannerModel({
      image,
    });

    await bannerImages.save();

    res.status(200).json({
      success: true,
      data: bannerImages,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

const getBannerImage = async (req, res) => {
  try {
    const images = await BannerModel.find({});

    res.status(200).json({
      success: true,
      data: images,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};




const deleteBannerImage = async (req, res) => {
  try {
    const {id} = req.params; 
    const images = await BannerModel.findById(id);

    if (!images) {
      res.status(404).json({
        success:false,
        message:"Banner Not Found",
      })
    }
    await  BannerModel.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Banner deleted Successfully!",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

module.exports = { addBannerImage, getBannerImage,deleteBannerImage };
