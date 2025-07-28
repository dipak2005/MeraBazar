const mongoose = require("mongoose");

const BannerSchema = new mongoose.Schema(
  {
    image: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("banner", BannerSchema);
