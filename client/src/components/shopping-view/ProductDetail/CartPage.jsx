import React, { useEffect } from "react";
import CartItem from "./CartItem";
import PriceDetails from "./PriceDetail";
import ShoppingHeader from "../Header";
import { fetchCartProduct } from "../../../store/shop/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import ProductSkeleton from "../../../common/ProductSkeleton";
import { useNavigate } from "react-router-dom";
import Footer from "../../../common/Footer";

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
    (acc, item) => acc + item.salePrice * item.quantity,
    0
  );

  function handleclick() {
    navigate("/");
  }

  function handleLogin() {
    navigate("/auth/login");
  }

  return (
    <>
      <div className=" container-fluid px-0 bg-light min-vh-100">
        <ShoppingHeader />
        <div className=" container my-4 vh-100">
          <div className=" w-100 mt-4 px-3">
            <div className="row">
              {/* Left: Cart Items */}
              <div className={items.length === 0 ? "col-md-12" : "col-md-8"}>
                <div className="bg-white rounded shadow-sm">
                  <div className="bg-white p-3">
                    {isAuthenticated ? (
                      <div className="length">
                        <h4>Mera Cart ({items.length})</h4>
                        <hr />
                      </div>
                    ) : null}

                    {items.length === 0 ? (
                      <div className="outer text-center">
                        <div className=" img-container">
                          <img
                            src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90"
                            alt="empty cart"
                            style={{
                              height: "190px",
                              width: "252px",
                            }}
                          />
                          <p className="mt-2 text-center">
                            {!isAuthenticated
                              ? "Missing Cart items?"
                              : "Your cart is empty!"}
                          </p>
                          <p
                            className="text-center"
                            style={{ fontSize: "13px" }}
                          >
                            {!isAuthenticated
                              ? "Login to see the items you added previously"
                              : "Add items to it now."}
                          </p>
                        </div>
                      </div>
                    ) : isAuthenticated ? (
                      items.map((item) =>
                        isLoading ? (
                          <ProductSkeleton key={item?.productId} />
                        ) : (
                          <CartItem key={item?.productId} item={item} />
                        )
                      )
                    ) : (
                      <div className="outer text-center">
                        <div className=" img-container">
                          <img
                            src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90"
                            alt="empty cart"
                            style={{
                              height: "190px",
                              width: "252px",
                            }}
                          />
                          <p className="mt-2 text-center">
                            Missing Cart items?
                          </p>
                          <p
                            className="text-center"
                            style={{ fontSize: "13px" }}
                          >
                            Login to see the items you added previously.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div
                    className={`d-flex ${
                      items.length === 0
                        ? "justify-content-center"
                        : "justify-content-end"
                    }`}
                    style={{
                      boxShadow:
                        items.length === 0
                          ? "none"
                          : "0px 0px 4px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    {isAuthenticated ? (
                      items.length === 0 ? (
                        <button
                          onClick={handleclick}
                          className="btn m-3"
                          style={{
                            width: "15rem",
                            height: "2.8rem",
                            borderRadius: "0.2rem",
                            backgroundColor: "#2874F0",
                            color: "white",
                            fontSize: "1rem",
                            fontWeight: "500",
                          }}
                        >
                          Shop now
                        </button>
                      ) : (
                        <button
                          // onClick={handleLogin}
                          className="btn m-3"
                          style={{
                            width: "15rem",
                            height: "3.2rem",
                            borderRadius: "0.2rem",
                            backgroundColor: "#fd7e14",
                            color: "white",
                            fontSize: "1.1rem",
                            fontWeight: "500",
                          }}
                        >
                          PLACE ORDER
                        </button>
                      )
                    ) : (
                      <button
                        onClick={handleLogin}
                        className="btn m-3"
                        style={{
                          width: "15rem",
                          height: "3.2rem",
                          borderRadius: "0.2rem",
                          backgroundColor: "#fd7e14",
                          color: "white",
                          fontSize: "1.1rem",
                          fontWeight: "500",
                        }}
                      >
                        Login
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Right: Price Summary */}
              {isAuthenticated ? (
                <div className="col-md-4">
                  <PriceDetails cartItems={items} totalPrice={totalPrice} />
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default CartPage;

/* <div className={items.length === 0 ? "col-md-12" : "col-md-8"}>
                <div className=" bg-white rounded shadow-sm">
                  <div className=" bg-white p-3">
                    {isAuthenticated ? (
                      <div className="length">
                        <h4>Mera Cart ({items.length})</h4>
                        <hr />
                      </div>
                    ) : null}

                    {items.length === 0 ? (
                      <div className="outer text-center">
                        <div className=" img-container">
                          <img
                            src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90"
                            alt="empty cart"
                            style={{
                              height: "190px",
                              width: "252px",
                            }}
                          />
                          <p className="mt-2 text-center">
                            {!isAuthenticated
                              ? "Missing Cart items?"
                              : "Your cart is empty!"}
                          </p>
                          <p
                            className="text-center"
                            style={{ fontSize: "13px" }}
                          >
                            {!isAuthenticated
                              ? "Login to see the items you added previously"
                              : "Add items to it now."}
                          </p>
                        </div>
                      </div>
                    ) : (
                      items.map((item) =>
                        isLoading ? (
                          <ProductSkeleton key={item?.productId} />
                        ) : (
                          <CartItem key={item?.productId} item={item} />
                        )
                      )
                    )}
                  </div>
                 
                </div>
              </div>
*/
