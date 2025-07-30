const mongoose = require("mongoose");

const WishListSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    items: [
      // array of items
      {
        productId: {
          // id of product wich refers to product model
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const WishListModel = mongoose.model("wishlist", WishListSchema);

module.exports =  WishListModel;
