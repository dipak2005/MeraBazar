import axios from "axios";
import ProductModel from "../../models/ProductModel.js";
import cloudinary from "../../helper/cloudinary.js";
import { imageUploadUtils } from "../../helper/cloudinary.js";
import { generateEmbedding } from "../../utils/generateEmbedding.js";
/* ============================
   🔎 TEXT SEARCH
============================ */

const searchProduct = async (req, res) => {
  try {
    const { keyword } = req.params;

    if (!keyword || typeof keyword !== "string") {
      return res.status(400).json({
        success: false,
        message: "Keyword is required and must be a string",
      });
    }

    const regex = new RegExp(keyword, "i");

    const searchResults = await ProductModel.find({
      $or: [
        { title: regex },
        { description: regex },
        { category: regex },
        { brand: regex },
      ],
    });

    return res.status(200).json({
      success: true,
      data: searchResults,
    });

  } catch (error) {
    console.error("Text Search Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


function cosineSimilarity(vecA, vecB) {
  if (!vecA || !vecB || vecA.length !== vecB.length) return 0;

  const dotProduct = vecA.reduce((sum, val, i) => {
    return sum + val * vecB[i];
  }, 0);

  return dotProduct;
}

const searchByImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded",
      });
    }

    // 🔥 Generate query embedding
    const queryEmbedding = await generateEmbedding(req.file.buffer);

    if (!queryEmbedding || queryEmbedding.length === 0) {
      return res.status(500).json({
        success: false,
        message: "Failed to generate embedding",
      });
    }

    // 🔥 Only fetch valid embeddings
    const products = await ProductModel.find({
      embedding: { $exists: true, $ne: [] },
    });

    if (!products.length) {
      return res.json({
        success: true,
        products: [],
      });
    }

    const results = [];

    for (const product of products) {
      if (
        Array.isArray(product.embedding) &&
        product.embedding.length === queryEmbedding.length
      ) {
        const similarity = cosineSimilarity(
          queryEmbedding,
          product.embedding
        );

        results.push({
          ...product._doc,
          similarity,
        });
      }
    }

    // 🔥 Apply similarity threshold
    const SIMILARITY_THRESHOLD = 0.75;

    const filtered = results
      .filter((item) => item.similarity >= SIMILARITY_THRESHOLD)
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 10);

    return res.json({
      success: true,
      products: filtered,
    });

  } catch (error) {
    console.error("Image Search Error:", error);
    return res.status(500).json({
      success: false,
      message: "Search failed",
    });
  }
};


export { searchProduct, searchByImage };