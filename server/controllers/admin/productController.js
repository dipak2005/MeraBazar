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
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
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
      totalStock,
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
    const listOfProduct = await ProductModel.find({});

    return res.status(200).json({
      success: true,
      data: listOfProduct,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured while add new Product",
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
      totalStock,
    } = req.body;

    const findProduct = await ProductModel.findById(id);

    if (!findProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found!",
      });
    }

    ProductModel.title = title || findProduct.title;
    ProductModel.description = description || findProduct.description;
    ProductModel.category = category || findProduct.category;
    ProductModel.brand = brand || findProduct.brand;
    ProductModel.price = price || findProduct.price;
    ProductModel.salePrice = salePrice || findProduct.salePrice;
    ProductModel.image = image || findProduct.image;

    await findProduct.save();

    return res.status(200).json({
      success: true,
      message: findProduct,
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
    const product = ProductModel.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found!",
      });
    }

    return res.status(200).json({
        success:true,
        message:"Product deleted Successfully!",
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
