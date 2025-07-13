import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ImageGallery from "../ProductDetail/ImageGallery";
import ProductInfo from "../ProductDetail/ProductInfo";
import Specifications from "../ProductDetail/Specifications";
import OffersSection from "../ProductDetail/OfferSection";
import Highlights from "../ProductDetail/Highlights";

import ProductSkeleton from "../../../common/ProductSkeleton";
import { fetchProductDetails } from "../../../store/shop/productSlice";
import ShoppingHeader from "../Header";
import { useState } from "react";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [image ,setImage] = useState("");
  const dispatch = useDispatch();
  const { productDetails: product, isLoading } = useSelector(
    (state) => state.shopProduct
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetails(id));
    }
  }, [dispatch, id]);

 ;

  return (
    <div className="container-fluid bg-light">
      <ShoppingHeader/>
    <div className="container mt-1 bg-white ">
      
      <div className="row">
        <div className="col-md-7 mt-3">
        <ImageGallery product={product}/>
        </div>
        <div className="col-md-5 d-flex align-items-center">
          <ProductInfo product={product} />
          {/* <OffersSection product={product} /> */}
          {/* <Highlights product={product} /> */}
        </div>
      </div>
      {/* <Specifications product={product} /> */}
    </div>
    </div>
  );
};

export default ProductDetailPage;
