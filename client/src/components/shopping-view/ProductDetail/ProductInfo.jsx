// components/ProductDetail/ProductInfo.jsx
import React, { useEffect } from "react";
import ProductReview from "./ProductReview";
import { useDispatch, useSelector } from "react-redux";
import { getReviews } from "../../../store/shop/reviewSlice";
// import { Button } from 'react-bootstrap';

const ProductInfo = ({ product }) => {
  const { reviewList } = useSelector((state) => state.reviewProduct);
  const dispatch = useDispatch();
  useEffect(() => {
    if (product?._id) {
      dispatch(getReviews(product?._id));
    }
  }, [dispatch, product?._id]);

  console.log(reviewList, "review");
  return (
    <div className="mt-3 ">
      <h4>{product?.title}</h4>
      <p className="text-muted">
        by <strong>{product?.brand}</strong>
      </p>
      <div className="mb-2 h-10">
        {reviewList &&
          reviewList.map((item, index) => (
            <span key={index} className="badge bg-success me-2">
              {item?.reviewVal?.toFixed(1) || 3.4} ★
            </span>
          ))}
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
