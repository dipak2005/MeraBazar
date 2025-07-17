const mongoose = require("mongoose");

const SellerSchema = new mongoose.Schema({
  username: {
     type: String,
    required: true,
    unique: true,
  },
  email:{
      type: String,
    required: true,
    unique: true,
  },
  password:{
     type: String,
    required: true,
  },
  storeName: {
     type: String,
    required: true,
  },
  businessType: {
     type: String,
    required: true,
  },
  address: {
     type: String,
    required: true,
  },
  gstNumber: {
     type: String,
    required: true,
  },
  phone: {
     type: Number,
    required: true,
  },
  documents: {
    type: String,
    required: true,
  },
});


module.exports = new mongoose.model("Seller",SellerSchema);