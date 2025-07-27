const { imageUploadUtils } = require("../../helper/cloudinary");
const ProductModel = require("../../models/ProductModel");

  const handleImageUpload = async (req, res) => {
    try {
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      const dataUrl = `data:${req.file.mimetype};base64,${b64}`;
      const result = await imageUploadUtils(dataUrl);

      res.json({
        success: true,
        result,
      });
    } catch (e) {
      console.log(e);
      res.json({
        success: false,
        message: "Error occurred during image upload",
      });
    }
  };

//  add a new product
const addProduct = async (req, res) => {
  try {
    const {
      sellerId,
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      discount,
      totalStock,
    } = req.body;

    
    const newProduct = new ProductModel({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      discount,
      totalStock,
      sellerId
    });

   

    await newProduct.save();

    return res.status(200).json({
      success: true,
      data: newProduct,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured while add new Product",
    });
  }
};

// fetch all product
const fetchProduct = async (req, res) => {
  try {
    const { sellerId } = req.params;

    if (!sellerId) {
      return res.status(400).json({
        success: false,
        message: "Seller ID is required",
      });
    }

    const listOfProduct = await ProductModel.find({ sellerId });

    return res.status(200).json({
      success: true,
      data: listOfProduct,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      success: false,
      message: "Error occurred while fetching seller products",
    });
  }
};

// edits a products
const editProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      discount,
      totalStock,
    } = req.body;

    const findProduct = await ProductModel.findById(id);

    if (!findProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found!",
      });
    }

    findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.brand = brand || findProduct.brand;
    findProduct.price = price === '' ? 0 : price || findProduct.price;
    findProduct.salePrice = salePrice === '' ? 0 : salePrice || findProduct.salePrice;
    findProduct.totalStock = totalStock || findProduct.totalStock;
    findProduct.discount = discount === '' ? 0 : discount || findProduct.discount;
    findProduct.image = image || findProduct.image;

    await findProduct.save();

    return res.status(200).json({
      success: true,
      data: findProduct,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured while add new Product",
    });
  }
};

// delete a products
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found!",
      });
    }
    await ProductModel.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Product deleted Successfully!",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured while add new Product",
    });
  }
};

module.exports = {
  handleImageUpload,
  addProduct,
  fetchProduct,
  editProduct,
  deleteProduct,
};
