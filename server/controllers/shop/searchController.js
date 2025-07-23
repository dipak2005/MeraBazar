const ProductModel = require("../../models/ProductModel");

const searchProduct = async (req, res) => {
  try {
    const { keyword } = req.params;

    if (!keyword || typeof keyword !== "string") {
      return res.status(400).json({
        success: false,
        message: "Keyword is required and must be in String",
      });
    }

    const regeEx = new RegExp(keyword, "i");

    const createSearchQuery = {
      $or: [
        { title: regeEx },
        { description: regeEx },
        { category: regeEx },
        { brand: regeEx },
      ],
    };

    const searchResults = await ProductModel.find(createSearchQuery);

    res.status(200).json({
      success: true,
      data: searchResults,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

module.exports = { searchProduct };
