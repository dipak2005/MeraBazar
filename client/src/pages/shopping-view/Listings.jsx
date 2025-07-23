import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductTile from "./ProductTile";
import ProductSkeleton from "../../common/ProductSkeleton";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { addToCart } from "../../store/shop/cartSlice";


function ShoppingViewListings() {
  const dispatch = useDispatch();
  const [openDetailsPage, setOpenDetailsPage] = useState(false);
  const { user } = useSelector((state) => state.auth);
   const { cartItems } = useSelector((state) => state.shoppingcart);
  const { productList, productDetails, isLoading } = useSelector(
    (state) => state.shopProduct
  );
  


   function handleAddToCart(productId) {
    console.log("Trying to add to cart with:", {
    userId: user?._id || user?.id,  
    productId: productId, 
    quantity: 1
  });
    dispatch(
      addToCart({
        userId: user?.id,
        productId: productId,
        quantity: 1,
      })
    )
      .unwrap()
      .then((data) => {
        if (data?.payload?.success) {
          toast.success("Product added Successfully!");
          dispatch(fetchCartProduct({ userId: user?.id }));

         
        }
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
        // toast.error("Failed to add to cart");
      });
  }

  useEffect(() => {
    if (productDetails != null) {
      setOpenDetailsPage(true);
    }
  }, [productDetails]);

  

  return (
    <div className="container-fluid d-flex flex-column min-vh-100">
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
                  handleAddToCart={() => handleAddToCart(product.id || product._id)}
                  toast={toast}
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
