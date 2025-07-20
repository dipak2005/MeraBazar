const mongoose = require("mongoose");

const userAddressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
      default: "",
      trim: true,
    },
    place: {
      type: String,
      required:true,
    },
  },
  { timestamps: true }
);

const userAddressModel = mongoose.model("address", userAddressSchema);

module.exports = userAddressModel;
