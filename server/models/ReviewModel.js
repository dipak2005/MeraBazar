const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    username: String,
    reviewMessage: String,
    reviewVal: Number,
  },
  { timestamps: true }
);

const ReviewModel = mongoose.model("review", ReviewSchema);

module.exports = ReviewModel;
