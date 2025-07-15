import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductTile from "./ProductTile";
import ProductSkeleton from "../../common/ProductSkeleton";



function ShoppingViewListings() {
  const dispatch = useDispatch();
  const [openDetailsPage, setOpenDetailsPage] = useState(false);

  const { productList, productDetails, isLoading } = useSelector(
    (state) => state.shopProduct
  );



  useEffect(() => {
    if (productDetails != null) {
      setOpenDetailsPage(true);
    }
  }, [productDetails]);

  

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
                  // handleAddToCart={handleAddToCart}
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
