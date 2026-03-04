import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../../../common/Footer";
import SimpleNavbar from "../../../common/Navbar";
import ProductSkeleton from "../../../common/ProductSkeleton";
import { fetchCartProduct } from "../../../store/shop/cartSlice";
import CartItem from "./CartItem";
import PriceDetails from "./PriceDetail";

const CartPage = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { cartItem, isLoading } = useSelector((state) => state.shoppingcart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCartProduct({ userId: user.id }));
    }
  }, [dispatch, user?.id]);

  const items = Array.isArray(cartItem?.items) ? cartItem.items : [];
  const totalPrice = items.reduce(
    (acc, item) => acc + (item.salePrice || 0) * (item.quantity || 1),
    0
  );

  const handleNavigate = () => navigate("/shop/checkout");
  const handleLogin = () => navigate("/auth/login");
  const handleShop = () => navigate("/shop/listing");

  return (
    <div className="container-fluid px-0 bg-light min-vh-100 d-flex flex-column">
      <SimpleNavbar />
      <div className="container my-4 flex-grow-1">
        <div className="row">
          {/* Left: Cart Items */}
          <div className={items.length === 0 ? "col-12" : "col-12 col-md-8"}>
            <div className="bg-white rounded shadow-sm p-3">
              {isAuthenticated ? (
                <h4 className="fs-5 fs-md-4 mb-3">
                  Mera Cart ({items.length})
                </h4>
              ) : null}

              {items.length === 0 ? (
                <div className="text-center my-5">
                  <img
                    src="/images/cart.webp"
                    alt="empty cart"
                    className="img-fluid"
                    style={{ height: "190px", width: "252px" }}
                  />
                  <p className="mt-2">
                    {!isAuthenticated
                      ? "Missing Cart items?"
                      : "Your cart is empty!"}
                  </p>
                  <p className="text-muted small">
                    {!isAuthenticated
                      ? "Login to see the items you added previously."
                      : "Add items to it now."}
                  </p>
                  <button
                    onClick={isAuthenticated ? handleNavigate : handleLogin}
                    className="btn btn-primary mt-3"
                  >
                    {isAuthenticated ? "Place Order" : "Login"}
                  </button>
                </div>
              ) : isLoading ? (
                items.map((item, idx) => <ProductSkeleton key={idx} />)
              ) : (
                items.map((item) => <CartItem key={item.productId} item={item} />)
              )}
            </div>
          </div>

          {/* Right: Price Summary */}
          {isAuthenticated && items.length > 0 && (
            <div className="col-12 col-md-4 mt-4 mt-md-0">
              <PriceDetails cartItems={items} totalPrice={totalPrice} />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;