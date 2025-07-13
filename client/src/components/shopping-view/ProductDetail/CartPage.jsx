import React, { useEffect } from "react";
import CartItem from "./CartItem";
import PriceDetails from "./PriceDetail";
import ShoppingHeader from "../Header";
import { fetchCartProduct } from "../../../store/shop/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const CartPage = ({ onQuantityChange, onRemove }) => {
  const { user } = useSelector((state) => state.auth);
  const { cartItem, isLoading } = useSelector((state) => state.shoppingcart);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("User ID on load:", user?.id);
    if (user?.id) {
      dispatch(fetchCartProduct({ userId: user.id }));
    }
  }, [dispatch, user?.id]);

  const totalPrice = cartItem.reduce(
    (acc, item) => acc + (item?.productId?.price || 0) * (item?.quantity || 1),
    0
  );

  console.log(cartItem, "hello");

  return (
    <div className="container-fluid bg-light">
      <ShoppingHeader />
      <div className="container my-4">
        <div className="row">
          {/* Left: Cart Items */}
          <div className="col-md-8">
            <div className="bg-white p-3 rounded shadow-sm">
              <h4>My Cart ({cartItem.length})</h4>
              <hr />
              {isLoading ? (
                <p>Loading cart...</p>
              ) : cartItem.length === 0 ? (
                <p>Your cart is empty</p>
              ) : (
                cartItem.map((item) => (
                  <CartItem
                   key={`${item.productId}`}
                    item={item}
                    onQuantityChange={onQuantityChange}
                    onRemove={onRemove}
                  />
                ))
              )}
            </div>
          </div>

          {/* Right: Price Summary */}
          <div className="col-md-4">
            <PriceDetails cartItems={cartItem} totalPrice={totalPrice} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
