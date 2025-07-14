import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "../../store/shop/productSlice";
import ProductTile from "./ProductTile";
import ProductSkeleton from "../../common/ProductSkeleton";
import { addToCart, fetchCartProduct } from "../../store/shop/cartSlice";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

function ShoppingViewListings() {
  const dispatch = useDispatch();
  const [openDetailsPage, setOpenDetailsPage] = useState(false);

  const { productList, productDetails, isLoading } = useSelector(
    (state) => state.shopProduct
  );
  const { user } = useSelector((state) => state.auth);


  useEffect(() => {
    if (productDetails != null) {
      setOpenDetailsPage(true);
    }
  }, [productDetails]);

  function handleAddToCart(getCurrentProductId) {
    console.log(getCurrentProductId, "product id for cart");

    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    )
      .unwrap()
      .then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchCartProduct({ userId: user?.id }));
          toast.success("Product added Successfully!");
        }
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
        // toast.error("Failed to add to cart");
      });
  }

  return (
    <div className="container-fluid">
      {productList.length === 0 ? (
        <div className="text-center py-5">
          <h4>No products found</h4>
        </div>
      ) : (
        <div className="row g-1">
          {productList.map((product) =>
            isLoading ? (
              <ProductSkeleton key={product.id || product._id} />
            ) : (
              <div
                key={product.id || product._id}
                className="col-12 col-sm-6 col-md-4 col-xl-3"
              >
                <ProductTile
                  key={product.id || product._id}
                  handleAddToCart={handleAddToCart}
                  product={product}
                  
                />
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default ShoppingViewListings;
