// server/controllers/seller/ProductController.js

import { imageUploadUtils } from "../../helper/cloudinary.js";
import ProductModel from "../../models/ProductModel.js";

// Upload image to Cloudinary
export const handleImageUpload = async (req, res) => {
  try {
    const fileBuffer = req.file.buffer;

    const result = await imageUploadUtils(
      `data:${req.file.mimetype};base64,${fileBuffer.toString("base64")}`,
    );

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error uploading image",
    });
  }
};

// Utility function to normalize a vector
export const normalizeVector = (vector) => {
  const magnitude = Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));
  return vector.map((val) => val / magnitude);
};

// Add a new product
export const addProduct = async (req, res) => {
  try {
    const {
      title,
      brand,
      price,
      salePrice,
      discount,
      description,
      images,
      totalStock,
      sellerId,
    } = req.body;

    if (!sellerId) {
      return res.status(400).json({
        success: false,
        message: "Seller ID is required",
      });
    }

    const newProduct = new ProductModel({
      title,
      brand,
      price,
      salePrice,
      discount,
      description,
      images,
      totalStock,
      sellerId,
    });

    await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      data: newProduct,
    });
  } catch (error) {
    console.error("Add Product Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Fetch all products of a seller
export const fetchProduct = async (req, res) => {
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

// Edit a product
export const editProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      images,
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
    findProduct.price = price === "" ? 0 : price || findProduct.price;
    findProduct.salePrice =
      salePrice === "" ? 0 : salePrice || findProduct.salePrice;
    findProduct.totalStock = totalStock || findProduct.totalStock;
    findProduct.discount =
      discount === ""
        ? 0
        : parseFloat(discount).toFixed(2) ||
          parseFloat(findProduct.discount).toFixed(2);
    if (images && images.length > 0) {
      findProduct.images = images;
    }

    await findProduct.save();

    return res.status(200).json({
      success: true,
      data: findProduct,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occurred while updating Product",
    });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
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
      message: "Error occurred while deleting Product",
    });
  }
};
