import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import Footer from "../../../common/Footer";
import SimpleNavbar from "../../../common/Navbar";
import ProductDetailsSkeleton from "../../../common/ProductDetailsSkeleton";
import ImageGallery from "../ProductDetail/ImageGallery";
import ProductInfo from "../ProductDetail/ProductInfo";

import {
  addNewItem,
  deleteItem,
  getItem,
} from "../../../store/shop/wishlistSlice";

import { fetchProductDetails } from "../../../store/shop/productSlice";

const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const { user } = useSelector((state) => state.auth);
  const { wishList } = useSelector((state) => state.userWishList);
  const { productDetails: product } = useSelector((state) => state.shopProduct);

  // Wishlist toggle
  const handleWishlistToggle = (productId) => {
    if (!user?.id) return toast.error("Please login to manage wishlist");

    const isWishlisted = wishList.some((item) => item.productId === productId);

    if (isWishlisted) {
      dispatch(deleteItem({ userId: user.id, productId }))
        .then(() => {
          toast.success("Removed from wishlist");
          dispatch(getItem(user.id));
        })
        .catch(() => toast.error("Failed to remove from wishlist"));
    } else {
      dispatch(addNewItem({ userId: user.id, productId }))
        .then(() => {
          toast.success("Added to wishlist");
          dispatch(getItem(user.id));
        })
        .catch(() => toast.error("Failed to add to wishlist"));
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
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
              {/* IMAGE GALLERY */}
              <div className="col-lg-5 col-md-6 mb-3">
                <ImageGallery
                  product={product}
                  toast={toast}
                  handleWishlistToggle={handleWishlistToggle}
                  user={user}
                  wishList={wishList}
                />
              </div>

              {/* PRODUCT INFO */}
              <div className="col-lg-7 col-md-6 mb-3">
                <ProductInfo product={product} />
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;