import React, { useEffect } from "react";
import CartItem from "./CartItem";
import PriceDetails from "./PriceDetail";
import ShoppingHeader from "../Header";
import { fetchCartProduct } from "../../../store/shop/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import ProductSkeleton from "../../../common/ProductSkeleton";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { user } = useSelector((state) => state.auth);
  const { cartItem, isLoading } = useSelector((state) => state.shoppingcart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("User ID on load:", user?.id);
    if (user?.id) {
      dispatch(fetchCartProduct({ userId: user.id }));
    }
  }, [dispatch, user?.id]);

  const totalPrice = Array.isArray(cartItem?.items)
    ? cartItem.items.reduce(
        (acc, item) => acc + item.salePrice * item.quantity,
        0
      )
    : 0;

  console.log(cartItem, "hello");

  function handleclick() {
   navigate("/");
  }

  return (
    <>
      <div className="container-fluid bg-light vh-100">
        <ShoppingHeader />
        <div className="container my-4">
          <div className="row">
            {/* Left: Cart Items */}
            <div
              className={
                cartItem?.items?.length === 0 ? "col-mg-10" : "col-md-8"
              }
            >
              <div className="bg-white  rounded shadow-sm">
                <div className="bg-white p-3 ">
                  <h4>Mera Cart ({cartItem?.items?.length})</h4>
                  <hr />

                  {!Array.isArray(cartItem?.items) ||
                  cartItem?.items?.length === 0 ? (
                    <div className="outer">
                      <div class="row justify-content-center">
                        <img
                          src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90"
                          alt="flipkart"
                          style={{
                            height: "190px",
                            width: "252px",
                            justifyContent: "center",
                          }}
                        />
                        <p className="text-center">Your cart is empty!</p>
                        <p
                          className="text-center "
                          style={{ fontSize: "14px" }}
                        >
                          Add items it now.
                        </p>
                      </div>
                    </div>
                  ) : (
                    cartItem?.items?.map((item) =>
                      isLoading ? (
                        <ProductSkeleton key={`${item?.productId}`} />
                      ) : (
                        <CartItem key={`${item?.productId}`} item={item} />
                      )
                    )
                  )}
                </div>
                <div
                  className={
                    cartItem?.items?.length === 0
                      ? "d-flex justify-content-center "
                      : "d-flex justify-content-end "
                  }
                  style={{
                    boxShadow: cartItem?.items?.length === 0? "none":"0px 0px 4px 0px rgba(0, 0, 0, 0.2)",
                    verticalAlign: "middle",
                  }}
                >
                  {
                    cartItem?.items?.length === 0? <button onClick={handleclick}
                    className=" btn  m-3"
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
                  </button> : <button
                    className=" btn  m-3"
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
                  }
                </div>
              </div>
            </div>

            {/* Right: Price Summary */}
            <div className="col-md-4">
              <PriceDetails
                cartItems={cartItem?.items || []}
                totalPrice={totalPrice}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
