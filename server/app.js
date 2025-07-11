require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Routes
const AuthRouter = require("./routes/auth/AuthRouter");
const AdminProductRouter = require("./routes/admin/productRoute");

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

app.listen(port, () => {
  console.log(`listening port on ${port}`);
});
