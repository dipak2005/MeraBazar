const Product = require("../../models/ProductModel");

//  Get all filtered products
const getFilteredProducts = async (req, res) => {
  try {
    const {
      category = "",
      brand = "",
      sortBy = "price-lowtohigh",
    } = req.query;

    const filters = {}; 

     if (category.length) {
      filters.category = { $in: category.split(",") };
    }

    if (brand.length) {
      filters.brand = { $in: brand.split(",") };
    }

    let sort = {};

    switch (sortBy) {
      case "price-lowtohigh":
        sort.price = 1;
        break;
      case "price-hightolow":
        sort.price = -1;
        break;
      case "title-atoz":
        sort.title = 1;
        break;
      case "title-ztoa":
        sort.title = -1;
        break;
      default:
        sort.price = 1;
    }

 

    const products = await Product.find(filters).sort(sort);

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error(" Filter Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch products.",
    });
  }
};



//  Get single product details
const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error(" Error in getProductDetails:", error.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching product details.",
    });
  }
};

module.exports = {
  getFilteredProducts,
  getProductDetails,
};
