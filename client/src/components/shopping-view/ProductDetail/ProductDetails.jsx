import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ImageGallery from "../ProductDetail/ImageGallery";
import ProductInfo from "../ProductDetail/ProductInfo";
// import Specifications from "../ProductDetail/Specifications";
// import OffersSection from "../ProductDetail/OfferSection";
// import Highlights from "../ProductDetail/Highlights";

import ProductSkeleton from "../../../common/ProductSkeleton";
import { fetchProductDetails } from "../../../store/shop/productSlice";
import ShoppingHeader from "../Header";
import { useState } from "react";
import Footer from "../../../common/Footer";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import SimpleNavbar from "../../../common/Navbar";

const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { productDetails: product, isLoading } = useSelector(
    (state) => state.shopProduct
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetails(id));
    }
  }, [dispatch, id]);

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <SimpleNavbar />
      <div className="container-fluid py-3 flex-grow-1">
        <div className="container bg-white shadow-sm rounded p-3">
          <div className="row">
            {/* LEFT COLUMN - IMAGE GALLERY */}
            <div className="col-lg-5 col-md-6 mb-3">
              <ImageGallery product={product} toast={toast} />
            </div>

            {/* RIGHT COLUMN - PRODUCT DETAILS */}
            <div className="col-lg-7 col-md-6 mb-3">
              <ProductInfo product={product} />
            </div>
          </div>

          {/* Additional sections if needed later */}
          {/* <OffersSection product={product} /> */}
          {/* <Highlights product={product} /> */}
          {/* <Specifications product={product} /> */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
