const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: String,
  cartItems: [
    {
      productId: String,
      title: String,
      image: String,
      price: String,
      quantity: Number,
      discount: Number,
    },
  ],
  addressInfo: {
    addressId: String,
    address: String,
    city: String,
    pincode: String,
    phone: String,
    notes: String,
  },
  orderStatus: String,
  paymentMethod: String,
  paymentStatus: String,
  totalAmount: Number,
  subtotal: Number,
  discountAmount: Number,
  shippingCharge: Number,
  orderDate: Date,
  orderUpdateDate: Date,
  paymentId: String,
  payerId: String,
  cartId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart",
  },
},{ timestamps: true });

const OrderModel = new mongoose.model("order", OrderSchema);

module.exports = OrderModel;
