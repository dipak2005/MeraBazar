import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { deleteItem } from "../../store/shop/wishlistSlice";
import { useDispatch, useSelector } from "react-redux";

function ProductTile({
  product,
  handleAddToCart,
  toast,
  wishList,
  handleWishlistToggle,
}) {
  const [animate, setAnimate] = useState(false);
  function handleHeartClick(params) {
    handleWishlistToggle(product._id);
    setAnimate(true);

    setTimeout(() => setAnimate(false), 300);
  }
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const isInWishList = wishList?.some((item) => item.productId === product._id);
  return (
    <div
      className="card h-100 border-0 rounded-0 product-card"
      style={{ transition: "all 0.3s ease-in-out" }}
    >
      <div
        className={`heart-icon-wrapper ${animate ? "pop-animation" : ""}`}
        style={{ zIndex: 10, cursor: "pointer" }}
        onClick={handleHeartClick}
      >
        {isInWishList ? (
          <AiFillHeart size={22} color="red" />
        ) : (
          <AiOutlineHeart size={22} color="gray" />
        )}
      </div>

      <Link
        to={`/product/${product._id}`}
        className="text-decoration-none text-dark"
        // rel="noopener noreferrer"
        target="_blank"
      >
        {product?.totalStock === 0 ? (
          <span className="badge bg-danger position-absolute top-0 start-0 m-2">
            Out Of Stock
          </span>
        ) : product?.totalStock < 10 ? (
          <span className="badge bg-warning position-absolute top-0 start-0 m-2">
            Only {product?.totalStock} items left
          </span>
        ) : product?.salePrice > 1500 ? (
          <span className="badge bg-success position-absolute top-0 start-0 m-2">
            Best Seller
          </span>
        ) : null}

        <img
          src={product?.image}
          className="card-img-top p-3"
          alt={product?.title}
          style={{ height: "200px", objectFit: "contain" }}
        />
      </Link>

      <div className="card-body p-3">
        <h6 className="card-title fw-bold text-truncate mb-1">
          {product?.title}
        </h6>
        <p className="text-muted small mb-2 text-capitalize">
          {product?.brand}
        </p>
        <div className="d-flex align-items-center">
          <h5 className="mb-0 text-primary">₹{product?.salePrice}</h5>
          {product?.salePrice > 0 && (
            <>
              <small className="ms-2 text-muted text-decoration-line-through">
                ₹{product?.price}
              </small>
              <small className="ms-auto text-success fw-semibold">
                {product?.discount}% off
              </small>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductTile;

/*

import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 5000;

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the frontend's dist folder
app.use(express.static(path.join(__dirname, "..", "client", "dist")));

// API routes (put your API routes here)
// app.use("/api/products", productRoutes);

// Serve index.html for all unmatched routes (important for React Router)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "dist", "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

*/
