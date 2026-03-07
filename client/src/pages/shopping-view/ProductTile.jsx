// ProductTile.jsx
import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function ProductTile({
  product,
  wishList = [],
  handleWishlistToggle,
}) {
  const [animate, setAnimate] = useState(false);
  const [mainImage, setMainImage] = useState(
    product?.images && product.images.length > 0
      ? product.images[0]
      : product?.image || "https://via.placeholder.com/200"
  );

  const { user } = useSelector((state) => state.auth);
  const isInWishList = wishList?.some((item) => item.productId === product._id);

  const handleHeartClick = () => {
    handleWishlistToggle(product._id);
    setAnimate(true);
    setTimeout(() => setAnimate(false), 300);
  };

  return (
    <div
      className="card h-100 border-0 rounded-0 product-card"
      style={{ transition: "all 0.3s ease-in-out", position: "relative" }}
    >
      {/* Wishlist Heart */}
      <div
        className={`heart-icon-wrapper ${animate ? "pop-animation" : ""}`}
        style={{ zIndex: 10, cursor: "pointer", position: "absolute", top: 8, right: 8 }}
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
      >
        {/* Badges */}
        {product?.totalStock === 0 ? (
          <span className="badge bg-danger position-absolute top-0 start-0 m-2">
            Out Of Stock
          </span>
        ) : product?.totalStock < 10 ? (
          <span className="badge bg-warning position-absolute top-0 start-0 m-2">
            Only {product.totalStock} left
          </span>
        ) : product?.salePrice > 1500 ? (
          <span className="badge bg-success position-absolute top-0 start-0 m-2">
            Best Seller
          </span>
        ) : null}

        {/* Main Image */}
        <div className="card-img-container p-3">
          <img
            src={mainImage}
            alt={product?.title}
            className="card-img-top"
            style={{ height: "200px", objectFit: "contain" }}
          />

          <p>Explore this Product</p>
          {/* Thumbnails */}
          {product?.images && product.images.length > 1 && (
            <div className="d-flex gap-1 mt-2 flex-wrap">
              {product.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${product.title}-${idx}`}
                  style={{
                    width: "50px",
                    height: "50px",
                    objectFit: "cover",
                    border: mainImage === img ? "2px solid #007bff" : "1px solid #ddd",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>
          )}
        </div>
      </Link>

      {/* Product Info */}
      <div className="card-body p-3">
        <h6 className="card-title fw-bold text-truncate mb-1">{product?.title}</h6>
        <p className="text-muted small mb-2 text-capitalize">{product?.brand}</p>

        <div className="d-flex align-items-center">
          <h5 className="mb-0 text-primary">₹{product?.salePrice}</h5>
          {product?.salePrice > 0 && (
            <>
              <small className="ms-2 text-muted text-decoration-line-through">
                ₹{product?.price}
              </small>
              {product.discount > 0 && (
                <small className="ms-auto text-success fw-semibold">
                  {parseFloat(product?.discount).toPrecision(2)}% off
                </small>
              )}
            </>
          )}
        </div>
      </div>
    </div>

  );
}

export default ProductTile;