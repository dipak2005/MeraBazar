require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

// Routes
const AuthRouter = require("./routes/auth/AuthRouter.routes"); // Authentication
const AdminProductRouter = require("./routes/admin/productRoute.routes"); // for Admin : product
const SellerProductRouter = require("./routes/seller/ProductRoute.routes"); // for seller : product
const ShopProductRouter = require("./routes/shop/productRoute.routes"); // for Shop : product
const CartRouter = require("./routes/shop/cartRoute.routes"); // for Shop : cart
const UserAddressRouter = require("./routes/shop/addressRoute.routes"); // for Shop : store user's address
const UserOrderRouter = require("./routes/shop/orderRoute.routes"); // for shop : manage User's orders
const SellerOrderRouter = require("./routes/seller/OrderRoute.routes"); // for seller : to fetch user's order
const UserRouter = require("./routes/seller/UserRoute.routes"); // for seller : to get the details of buyer's
const SearchRouter = require("./routes/shop/searchRoute.routes"); // for user : to search the product via : title,description , category,brand
const ReviewRouter = require("./routes/shop/reviewRoute.routes"); // for user : to post review on specific product
const SellerAuthRouter = require("./routes/auth/SellerAuthRouter.routes"); // seller Authentication
const SellerListingRouter = require("./routes/admin/seller-listingRoute.routes"); // admin : to manage the seller's
const CommonBannerRouter = require("./routes/common/BannerRoute.routes"); // banner added by admin show to User's
const WishListRouter = require("./routes/shop/wishlistRoute.routes"); // user store favourite item in there list.
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const basicAuth = require("./basicAuth");


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


// Fix __dirname for ES Modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// Serve static files from the frontend's dist folder
app.use(express.static(path.join(__dirname, "..", "client", "dist")));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use("/api/auth", AuthRouter);
app.use("/api/auth/seller", SellerAuthRouter);
app.use("/api/auth/sellerlist", SellerListingRouter);
app.use("/api/auth/user", UserRouter);
app.use("/api/admin/products", AdminProductRouter);
app.use("/api/seller/products", SellerProductRouter);
app.use("/api/seller/orders", SellerOrderRouter);
app.use("/api/shop/products", ShopProductRouter);
app.use("/api/shop/cart", CartRouter);
app.use("/api/shop/address", UserAddressRouter);
app.use("/api/shop/order", UserOrderRouter);
app.use("/api/shop/product/search", SearchRouter);
app.use("/api/shop/review", ReviewRouter);
app.use("/api/common/banner", CommonBannerRouter);
app.use("/api/shop/account/wishlist",WishListRouter);






if(process.env.NODE_ENV != "production"){
app.use(
  "/api-docs",

  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCssUrl: "/swagger.css",
    customSiteTitle: "MeraBazar API Docs",
    // customfavIcon: "/favicon.ico",
    explorer: true,
    swaggerOptions: {
      docExpansion: "list",
      filter: true,
      showRequestDuration: true,
    },
  })
);
}


// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "..", "client", "dist", "index.html"));
// });

app.listen(port, () => {
  console.log(`listening port on ${port}`);
});
