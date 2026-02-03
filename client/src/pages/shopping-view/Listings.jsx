import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductTile from "./ProductTile";
import ProductSkeleton from "../../common/ProductSkeleton";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { addToCart } from "../../store/shop/cartSlice";
import {
  addNewItem,
  deleteItem,
  getItem,
} from "../../store/shop/wishlistSlice";

function ShoppingViewListings() {
  const dispatch = useDispatch();
  const [openDetailsPage, setOpenDetailsPage] = useState(false);
  const { wishList } = useSelector((state) => state.userWishList);
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shoppingcart);
  // const {isInWishList , setIsInWishList} = useState(false);
  const { productList, productDetails, isLoading } = useSelector(
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



  function handleAddToCart(productId) {
    console.log("Trying to add to cart with:", {
      userId: user?._id || user?.id,
      productId: productId,
      quantity: 1,
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
    window.scrollTo(0,0);
    if (productDetails != null) {
      setOpenDetailsPage(true);
    }
  }, [productDetails]);

  useEffect(() => {
    if (user?.id) {
      dispatch(getItem(user?.id)).then((data)=>{
        console.log(data);
      })
    }
  }, [user]);

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
                  handleAddToCart={() =>
                    handleAddToCart(product.id || product._id)
                  }
                  toast={toast}
                  product={product}
                  wishList={wishList}
                  // isInWishList={wishList.some((item)=> item.productId === product._id)}
                  handleWishlistToggle={() =>
                    handleWishlistToggle(product._id)
                  }
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
