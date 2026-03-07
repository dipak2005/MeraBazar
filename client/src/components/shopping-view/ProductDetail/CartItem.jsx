import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  deleteCartProduct,
  fetchCartProduct,
  updateCartProduct,
} from "../../../store/shop/cartSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const product = typeof item.productId === "object" ? item.productId : null;

  // Get first image or fallback
  const imageUrl =
    product?.images && product.images.length > 0
      ? product.images[0]
      : product?.image
      ? product.image
      : "https://via.placeholder.com/150";

  // Title
  const title = product?.title || item.title || "Product";

  // Sale Price
  const salePrice = product?.salePrice || item.salePrice || 0;

  // Discount
  const discount = product?.discount || item.discount || 0;

  function handleCartDelete() {
    dispatch(
      deleteCartProduct({
        userId: user?.id,
        productId: item?.productId?._id || item.productId,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast.success("Item removed from cart!");
        dispatch(fetchCartProduct({ userId: user?.id }));
      } else {
        toast.error("Failed to remove item.");
      }
    });
  }

  function handleUpdateQuantity(typeOfAction) {
    const currentQty = Number(item.quantity) || 0;
    const totalStock = item.totalStock || product?.totalStock || 100; // default 100

    const updatedQuantity =
      typeOfAction === "plus" ? currentQty + 1 : currentQty - 1;

    if (updatedQuantity < 1) return;
    if (updatedQuantity > totalStock) {
      toast.error(`Only ${totalStock} items left in stock`);
      return;
    }

    dispatch(
      updateCartProduct({
        userId: user?.id,
        productId: item?.productId?._id || item.productId,
        quantity: updatedQuantity,
        discount,
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
        <a
          href={`/shop/product/${item.productId?._id || item.productId}`}
          className="text-decoration-none text-dark"
          rel="noopener noreferrer"
        >
          <img
  src={item.image || "https://via.placeholder.com/150"}
  alt={item.title || "Product"}
  style={{ width: "150px", height: "150px", objectFit: "contain" }}
  className="me-3"
/>
        </a>
        <div>
          <h6 className="mb-1">{title}</h6>
          <p className="text-muted mb-1">Sale price : ₹{salePrice}</p>
          <span className="text-success">{discount}% off</span>
          <div className="d-flex align-items-center gap-2 mt-2">
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={() => handleUpdateQuantity("minus")}
              disabled={item.quantity <= 1}
            >
              −
            </button>
            <span>{item.quantity || 1}</span>
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={() => handleUpdateQuantity("plus")}
            >
              +
            </button>
            <button
              className="btn btn-sm btn-outline-danger ms-3"
              onClick={handleCartDelete}
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