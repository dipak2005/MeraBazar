const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    image: String,
    title: String,
    description: String,
    category: String,
    brand: String,
    price: Number,
    salePrice: Number,
    discount: Number,
    totalStock: Number,
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "seller",
      required: true,
    },
    embedding: {
      type: [Number],
      default: null,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("product", ProductSchema);
