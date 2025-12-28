import React from "react";
import "../../src/index.css";

const ProductDetailsSkeleton = () => {
  return (
    <div className="container bg-white shadow-sm rounded p-3">
      <div className="row">
        {/* Image Skeleton */}
        <div className="col-lg-5 col-md-6 mb-3">
          <div className="skeleton-img-main mb-2"></div>
          <div className="d-flex gap-2">
            {[1].map((i) => (
              <div key={i} className="skeleton-img-thumb"></div>
            ))}
          </div>
        </div>

        {/* Info Skeleton */}
        <div className="col-lg-7 col-md-6 mb-3">
          <div className="skeleton-line title"></div>
          <div className="skeleton-line"></div>
          <div className="skeleton-line short"></div>

          <div className="skeleton-price"></div>

          <div className="skeleton-line"></div>
          <div className="skeleton-line"></div>

          <div className="d-flex gap-3 mt-4">
            <div className="skeleton-btn"></div>
            <div className="skeleton-btn outline"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
