import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ImageGallery from "../ProductDetail/ImageGallery";
import ProductInfo from "../ProductDetail/ProductInfo";
import ProductDetailsSkeleton from "../../../common/ProductDetailsSkeleton";
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
import {
  addNewItem,
  deleteItem,
  getItem,
} from "../../../store/shop/wishlistSlice";
import { Loader, LoaderCircle, LucideLoaderCircle } from "lucide-react";

const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);
  const { wishList } = useSelector((state) => state.userWishList);
  const { productDetails: product, isLoading } = useSelector(
    (state) => state.shopProduct
  );

  function handleWishlistToggle(productId) {
    if (!user?.id) {
      return toast.error("Please login to manage wishlist");
    }

    const isWishlisted = wishList.some((item) => item.productId === productId);

    if (isWishlisted) {
      dispatch(deleteItem({ userId: user?.id, productId }))
        .then(() => {
          toast.success("Remove d from wishlist");
          dispatch(getItem(user?.id));
        })
        .catch(() => toast.error("Failed to remove from wishlist"));
    } else {
      dispatch(addNewItem({ userId: user?.id, productId }))
        .then(() => {
          toast.success("Added to wishlist");
          dispatch(getItem(user?.id));
        })
        .catch(() => toast.error("Failed to add to wishlist"));
    }
  }

  useEffect(() => {
    if (id) {
      setLoading(true);
      dispatch(fetchProductDetails(id)).finally(() => setLoading(false));
    }

    if (user?.id) {
      dispatch(getItem(user.id));
    }
  }, [dispatch, id]);

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <SimpleNavbar />
      <div className="container-fluid py-3 flex-grow-1">
        {loading ? (
          <ProductDetailsSkeleton />
        ) : (
          <div className="container bg-white shadow-sm rounded p-3">
            <div className="row">
              <div className="col-lg-5 col-md-6 mb-3">
                <ImageGallery
                  product={product}
                  toast={toast}
                  handleWishlistToggle={handleWishlistToggle}
                  user={user}
                  wishList={wishList}
                />
              </div>

              <div className="col-lg-7 col-md-6 mb-3">
                <ProductInfo product={product} />
              </div>
            </div>

            {/* Additional sections if needed later */}
            {/* <OffersSection product={product} /> */}
            {/* <Highlights product={product} /> */}
            {/* <Specifications product={product} /> */}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
