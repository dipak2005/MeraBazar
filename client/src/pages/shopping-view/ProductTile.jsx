import React from "react";
import { useDispatch, useSelector } from "react-redux";

function ProductTile({ product, handleAddToCart, toast }) {
  // function handleAddToCart(getCurrentProductId) {
  //   console.log(getCurrentProductId, "product id for cart");

  //   dispatch(
  //     addToCart({
  //       userId: user?.id,
  //       productId: getCurrentProductId,
  //       quantity: 1,
  //     })
  //   )
  //     .unwrap()
  //     .then((data) => {
  //       if (data?.payload?.success) {
  //         toast.success("Product added Successfully!");
  //         dispatch(fetchCartProduct({ userId: user?.id }));

  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error adding to cart:", error);
  //       // toast.error("Failed to add to cart");
  //     });
  // }
  return (
    <div
      className="card h-100 border-0 rounded-0 product-card"
      style={{ transition: "all 0.3s ease-in-out" }}
    >
      <a
        href={`/shop/product/${product._id}`}
        className="text-decoration-none text-dark"
        rel="noopener noreferrer"
        target="_blank"
      >
        {/* Badge */}
        {product.salePrice > 500 && (
          <span className="badge bg-danger position-absolute top-0 start-0 m-2">
            Best Seller
          </span>
        )}

        {/* Product Image */}
        <img
          src={product?.image}
          className="card-img-top p-3"
          alt={product?.title}
          style={{ height: "200px", objectFit: "contain" }}
        />
      </a>
      {/* Product Details */}
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
        {/* <button
          onClick={() => handleAddToCart(product?._id || product?._id)}
          className="btn btn-sm btn-outline-primary w-100 mt-2"
        >
          Add to Cart
        </button> */}
      </div>
    </div>
  );
}

export default ProductTile;
