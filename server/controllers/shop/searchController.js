

import ProductModel from "../../models/ProductModel.js";
import { generateEmbeddingFromFile } from "../../utils/generateEmbedding.js";

const searchProduct = async (req, res) => {
  try {
    const { keyword } = req.params;

    if (!keyword || typeof keyword !== "string") {
      return res.status(400).json({
        success: false,
        message: "Keyword is required and must be in String",
      });
    }

    const regex = new RegExp(keyword, "i");

    const createSearchQuery = {
      $or: [
        { title: regex },
        { description: regex },
        { category: regex },
        { brand: regex },
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




function cosineSimilarity(a, b) {
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  return dot / (magA * magB);
}

 const imageSearch = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    // 1️⃣ Generate embedding from uploaded file
    const queryEmbedding = await generateEmbeddingFromFile(req.file);

    if (!queryEmbedding) {
      return res.status(500).json({ message: "Embedding failed" });
    }

    // 2️⃣ Fetch all products
    const products = await ProductModel.find({ embedding: { $exists: true } });

    // 3️⃣ Calculate similarity
    const scoredProducts = products.map((product) => ({
      ...product.toObject(),
      similarity: cosineSimilarity(queryEmbedding, product.embedding),
    }));

    // 4️⃣ Sort & take top 6
    scoredProducts.sort((a, b) => b.similarity - a.similarity);

    res.json(scoredProducts.slice(0, 6));

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Image search failed" });
  }
};
module.exports = { searchProduct  , imageSearch};
