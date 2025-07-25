const mongoose = require("mongoose");

const SellerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    storename: {
      type: String,
      required: true,
    },
    businesstype: {
      type: String,
      enum: ["Individual", "Company"],
      required: true,
    },
    bankaccount: {
      type: String,
      required: true,
    },
    ifsccode: {
      type: String,
      required: true,
    },
    document: {
      type: String, // file path or URL
      required: true,
    },
    approvalstatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    approvalnote: String,

    gstno: String,

    isapproved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("seller", SellerSchema);
