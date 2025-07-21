require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Routes
const AuthRouter = require("./routes/auth/AuthRouter"); // Authentication
const AdminProductRouter = require("./routes/admin/productRoute");  // for Admin : product
const SellerProductRouter = require("./routes/seller/ProductRoute"); // for seller : product
const ShopProductRouter = require("./routes/shop/productRoute");  // for Shop : product
const CartRouter = require("./routes/shop/cartRoute");  // for Shop : cart
const UserAddressRouter = require("./routes/shop/addressRoute"); // for Shop : store user's address
const UserOrderRouter = require("./routes/shop/orderRoute"); // for shop : manage User's orders 

const app = express();
const port = process.env.PORT || 3002;

async function main() {
  await mongoose.connect(process.env.ATLAS_DB_URL);
}

main()
  .then(() => {
    console.log("Connected to DB !");
  })
  .catch((e) => {
    console.log(e);
  });

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Exires",
      "Pragma",
    ],
    credentials: true,
  })
);


app.use(express.json());
app.use(cookieParser());

app.use(express.static("public"));
app.use("/api/auth", AuthRouter);
app.use("/api/admin/products",AdminProductRouter);
app.use("/api/seller/products",SellerProductRouter); 
app.use("/api/shop/products",ShopProductRouter);
app.use("/api/products",ShopProductRouter); // for global level Detail-page
app.use("/api/shop/cart",CartRouter);
app.use("/api/shop/address",UserAddressRouter);
app.use("/api/shop/order",UserOrderRouter);

app.listen(port, () => {
  console.log(`listening port on ${port}`);
});
