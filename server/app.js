require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

// Routes
const AuthRouter = require("./routes/auth/AuthRouter"); // Authentication
const AdminProductRouter = require("./routes/admin/productRoute"); // for Admin : product
const SellerProductRouter = require("./routes/seller/ProductRoute"); // for seller : product
const ShopProductRouter = require("./routes/shop/productRoute"); // for Shop : product
const CartRouter = require("./routes/shop/cartRoute"); // for Shop : cart
const UserAddressRouter = require("./routes/shop/addressRoute"); // for Shop : store user's address
const UserOrderRouter = require("./routes/shop/orderRoute"); // for shop : manage User's orders
const SellerOrderRouter = require("./routes/seller/OrderRoute"); // for seller : to fetch user's order
const UserRouter = require("./routes/seller/UserRoute"); // for seller : to get the details of buyer's
const SearchRouter = require("./routes/shop/searchRoute"); // for user : to search the product via : title,description , category,brand
const ReviewRouter = require("./routes/shop/reviewRoute"); // for user : to post review on specific product
const SellerAuthRouter = require("./routes/auth/SellerAuthRouter"); // seller Authentication
const SellerListingRouter = require("./routes/admin/seller-listingRoute");// admin : to manage the seller's
const CommonBannerRouter = require("./routes/common/BannerRoute"); // banner added by admin show to User's

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
    origin: `${process.env.ORIGIN}`,
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
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
app.use("/api/auth", AuthRouter);
app.use("/api/auth/seller", SellerAuthRouter);
app.use("/api/auth/sellerlist",SellerListingRouter);
app.use("/api/auth/user", UserRouter);
app.use("/api/admin/products", AdminProductRouter);
app.use("/api/seller/products", SellerProductRouter);
app.use("/api/seller/orders", SellerOrderRouter);
app.use("/api/shop/products", ShopProductRouter);
// app.use("/api/products", ShopProductRouter); // for global level Detail-page
app.use("/api/shop/cart", CartRouter);
app.use("/api/shop/address", UserAddressRouter);
app.use("/api/shop/order", UserOrderRouter);
app.use("/api/shop/product/search", SearchRouter);
app.use("/api/shop/review",ReviewRouter);
app.use("/api/common/banner",CommonBannerRouter);


// app.use(express.static(path.join(__dirname, "../client/dist")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/dist/index.html"));
// });

app.listen(port, () => {
  console.log(`listening port on ${port}`);
});




