// components/ProductDetail/ProductInfo.jsx
import React from "react";
import ProductReview from "./ProductReview";
// import { Button } from 'react-bootstrap';

const ProductInfo = ({ product }) => {
  return (
    <div className="mt-3 ">
      <h4>{product?.title}</h4>
      <p className="text-muted">
        by <strong>{product?.brand}</strong>
      </p>
      <div className="mb-2 h-10">
        <span className="badge bg-success">3.4{product?.rating} ★</span>
        {/* <span className="ms-2 text-muted">{product?.description} Ratings & Reviews</span> */}
      </div>
      <div className="mb-3">
        <p className="">
          {" "}
          <b>for {product?.category}</b>{" "}
        </p>
        <h4>
          ₹{product?.salePrice}
          &nbsp;
          <small className="text-muted text-decoration-line-through">
            ₹{product?.price}
          </small>
          &nbsp; &nbsp;
          <span className="text-success">{product?.discount}% off</span>
        </h4>
        <h4>
          <small className="text-muted">{product?.description}</small>
        </h4>
        <b>Available Stock : {product?.totalStock} </b>
      </div>
      <ProductReview product={product} />
    </div>
  );
};

export default ProductInfo;
