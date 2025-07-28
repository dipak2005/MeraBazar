import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCartProduct,
  fetchCartProduct,
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
        productId:  item?.productId,
      })
    ).then((data) => {
      console.log(data);
      if (data?.payload?.success) {
        
        toast.success("Item removed from cart!");
        dispatch(fetchCartProduct({ userId: user?.id }));
      } else {
        toast.error("Failed to remove item.");
      }
    });
  }
  // console.log(user);
  function handleUpdateQuantity(item, typeOfAction, totalStock) {
    const currentQty = Number(item.quantity) || 0;

    if (currentQty >= totalStock) {
      toast.error(`Only ${totalStock} Quantity are left`);
      return;
    }

    console.log(item.totalStock, "stock");
    console.log(item.quantity, "quantity");

    const updatedQuantity =
      typeOfAction === "plus" ? currentQty + 1 : currentQty - 1;

    if (updatedQuantity < 1) {
      return;
    }

    dispatch(
      updateCartProduct({
        userId: user?.id,
        productId: item?.productId,
        quantity: updatedQuantity,
        discount: item?.discount || item?.productId?.discount,
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
    <>
      <div className="d-flex justify-content-between align-items-center border-bottom py-3">
        <div className="d-flex">
          <a
            href={`/shop/product/${item.productId?._id || item.productId}`}
            className="text-decoration-none text-dark"
            rel="noopener noreferrer"
          >
            <img
              src={item.image}
              alt={item.title}
              style={{ width: " 150px", height: "150px", objectFit: "contain" }}
              className="me-3"
            />
          </a>

          <div>
            <h6 className="mb-1">{item.title}</h6>
            <p className="text-muted mb-1">Sale price : ₹{item.salePrice}</p>
            <span className="text-success">{item.discount}% off</span>
            <div className="d-flex align-items-center gap-2 mt-2">
              <button
                className="btn btn-sm btn-outline-primary"
                onClick={() =>
                  handleUpdateQuantity(item, "minus", item.totalStock)
                }
                disabled={item.quantity <= 1}
              >
                −
              </button>
              <span>{item.quantity || 1}</span>
              <button
                className="btn btn-sm btn-outline-primary"
                onClick={() =>
                  handleUpdateQuantity(item, "plus", item.totalStock)
                }
                // disabled={item.quantity >= item.totalStock}
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
    </>
  );
};

export default CartItem;
