import React from "react";
import SimpleNavbar from "../../common/Navbar";
import { useSelector } from "react-redux";
import ProductSkeleton from "../../common/ProductSkeleton";
import { toast } from "react-toastify";
import ProductTile from "./ProductTile";
import FilterSidebar from "../../components/shopping-view/Filter";
import Footer from "../../common/Footer";
import { PackageOpen } from "lucide-react";

function SearchPage() {
  const { searchResults, isLoading } = useSelector(
    (state) => state.searchProduct
  );
  const { cartItems } = useSelector((state) => state.shoppingcart);

  // function handleAddToCart(productId) {
  //   console.log("Trying to add to cart with:", {
  //     userId: user?._id || user?.id,
  //     productId: productId,
  //     quantity: 1,
  //   });
  //   dispatch(
  //     addToCart({
  //       userId: user?.id,
  //       productId: productId,
  //       quantity: 1,
  //     })
  //   )
  //     .unwrap()
  //     .then((data) => {
  //       if (data?.payload?.success) {
  //         toast.success("Product added Successfully!");
  //         dispatch(fetchCartProduct({ userId: user?.id }));
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error adding to cart:", error);
  //       // toast.error("Failed to add to cart");
  //     });
  // }

  return (
    <div className="d-flex flex-column bg-light min-vh-100">
      <SimpleNavbar searchResults={searchResults} />

      {/* Use regular container for better alignment */}
      <div className="container px-2m py-4 flex-grow-1">
        <div className="row">
          {/* Sidebar (full width on mobile, 3 cols on lg) */}
          {/* <div className="col-12 col-lg-4 mb-3">
            <div className="bg-white p-3 rounded shadow-sm h-100">
              <FilterSidebar />
            </div>
          </div> */}

          <div className="d-flex flex-column justify-content-center col-12 col-lg-12">
            {isLoading ? (
              <ProductSkeleton />
            ) : searchResults.length === 0 ? (
              <div className="text-center py-5 bg-white rounded shadow-sm">
                <PackageOpen size={58} />
                <h4>No products found</h4>
              </div>
            ) : (
              <div className="row g-1">
                {searchResults.map((product) => (
                 isLoading?  <ProductSkeleton key={product.id || product._id} />: <div
                    className="col-6 col-md-6 col-lg-3"
                    key={product._id || product.id}
                  >
                    <ProductTile
                      product={product}
                      toast={toast}
                      // handleAddToCart={() =>
                      //   handleAddToCart(product._id || product.id)
                      // }
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default SearchPage;
