import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCartProduct,
  updateCartProduct,
} from "../../../store/shop/cartSlice";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  function handleCartDelete(item) {
    dispatch(
      deleteCartProduct({
        userId: user?.id,
        productId: item?.productId,
      })
    );
  }

  function handleUpdateQuantity(item, typeOfAction) {
    const currentQty = Number(item.quantity) || 1; // fallback if null/undefined
    const updatedQuantity =
      typeOfAction === "plus" ? currentQty + 1 : currentQty - 1;

    dispatch(
      updateCartProduct({
        userId: user?.id,
        productId: item?.productId,
        quantity: updatedQuantity,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast.success("Cart updated successfully!");
      } else {
        toast.error("Failed to update cart.");
      }
    });
  }

  return (
    <div className="d-flex justify-content-between align-items-center border-bottom py-3">
      <div className="d-flex">
        <img
          src={item.image}
          alt={item.title}
          style={{ width: "80px", height: "80px", objectFit: "contain" }}
          className="me-3"
        />
        <div>
          <h6 className="mb-1">{item.title}</h6>
          <p className="text-muted mb-1">₹{item.price}</p>

          <div className="d-flex align-items-center gap-2 mt-2">
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={() => handleUpdateQuantity(item, "minus")}
              disabled={item.quantity <= 1}
            >
              −
            </button>
            <span>{item.quantity || 1}</span>
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={() => handleUpdateQuantity(item, "plus")}
            >
              +
            </button>
            <button
              className="btn btn-sm btn-outline-danger ms-3"
              onClick={() => handleCartDelete(item)}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
