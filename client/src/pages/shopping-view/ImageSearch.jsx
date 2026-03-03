import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SimpleNavbar from "../../common/Navbar";
import Footer from "../../common/Footer";
import ProductTile from "./ProductTile";
import ProductSkeleton from "../../common/ProductSkeleton";
import { PackageOpen } from "lucide-react";
import { searchProductsByImage } from "../../store/shop/searchSlice";
import { useLocation } from "react-router-dom";
import { addNewItem, deleteItem, getItem } from "../../store/shop/wishlistSlice";
import { toast } from "react-toastify";

function ImageSearchPage() {
  const { searchResults, isLoading } = useSelector(
    (state) => state.searchProduct,
  );
  const { cartItems } = useSelector((state) => state.shoppingcart);
  const { user } = useSelector((state) => state.auth);
  const { wishList } = useSelector((state) => state.userWishList);
  const dispatch = useDispatch();
  const location = useLocation();

  const products = location.state?.results || [];

  function handleWishlistToggle(productId) {
    if (!user?.id) {
      return toast.error("Please login to manage wishlist");
    }

    const isWishlisted = wishList.some((item) => item.productId === productId);

    if (isWishlisted) {
      dispatch(deleteItem({ userId: user?.id, productId }))
        .then(() => {
          toast.success("Removed from wishlist");
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
    if (user?.id) {
      dispatch(getItem(user?.id)).then((data) => {
        console.log(data);
        console.log(typeof searchResults);
      });
    }
  }, [user]);

  return (
    <div className="d-flex flex-column bg-light min-vh-100">
      <SimpleNavbar />

      <div className="container py-4 flex-grow-1">
        <h4 className="mb-4">Image Search Results</h4>

        {isLoading ? (
          <ProductSkeleton />
        ) : !Array.isArray(products) || products.length === 0 ? (
          <div className="text-center py-5 bg-white rounded shadow-sm">
            <PackageOpen size={58} />
            <h5>No similar products found</h5>
          </div>
        ) : (
          <div className="row g-2">
            {products.map((product) => (
              <div
                key={product._id || product.id}
                className="col-6 col-md-4 col-lg-3"
              >
                <ProductTile
                  product={product}
                  toast={toast}
                  wishList={wishList}
                  handleWishlistToggle={() =>
                    handleWishlistToggle(product._id || product.id)
                  }
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default ImageSearchPage;
