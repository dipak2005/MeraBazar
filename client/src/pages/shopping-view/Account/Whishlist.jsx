import { Delete, DeleteIcon, Table, Trash } from "lucide-react";
import React, { useEffect } from "react";
import { Card, Placeholder } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem, getItem } from "../../../store/shop/wishlistSlice";
import { AiFillHeart } from "react-icons/ai";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function Wishlist() {
  const { user } = useSelector((state) => state.auth);
  const { wishList, isLoading } = useSelector((state) => state.userWishList);
  const dispatch = useDispatch();

  function handleRemove(productId) {
    if (!user?.id) {
      return toast.error("Please login to manage wishlist");
    }

    dispatch(deleteItem({ userId: user?.id, productId }))
      .then(() => {
        toast.success("Removed from wishlist");
        dispatch(getItem(user?.id));
      })
      .catch(() => toast.error("Failed to remove from wishlist"));
  }

  useEffect(() => {
    if (user?.id) {
      dispatch(getItem(user?.id)).then((data) => {
        console.log(data);
      });
    }
  }, [user]);
  return !isLoading ? (
    <div className="container py-4">
      {wishList.length === 0 ? null : (
        <h4 className="mb-4 fw-semibold">
          My Wishlist ({wishList?.length || 0})
        </h4>
      )}

      {wishList?.length === 0 ? (
        <div className="text-center py-5">
          <img
            src="/images/wish.png"
            alt="Empty"
            width="110"
            className="mb-2"
          />
          <h6>Your wishlist is empty!</h6>
          <p className="text fs-12">Add items to view them here.</p>
        </div>
      ) : (
        <div className="d-flex flex-column gap-3">
          {wishList?.map((item, idx) => {
           
            return (
              <div
                className="card flex-row align-items-center p-2"
                key={item.productId || idx}
              >
                <Link
                  to={`/product/${item?.productId}`}
                  className="text-decoration-none text-dark"
                  rel="noopener noreferrer"
                  // target="_blank"
                >
                  <img
                    className="px-6 "
                    src={item?.image}
                    alt={item?.title}
                    style={{
                      width: "120px",
                      height: "100px",
                      objectFit: "contain",
                      borderRadius: "5px",
                    }}
                  />
                </Link>
                <Link
                  to={`/product/${item?.productId}`}
                  className="text-decoration-none text-dark"
                  rel="noopener noreferrer"
                  // target="_blank"
                >
                  <div className="flex-grow-1 px-3">
                    <h6 className="mb-1">{item?.title}</h6>
                    <div className="d-flex align-items-center gap-2 mb-2 ">
                      <span className="fw-bold text-dark fs-2.5">
                        ₹ {item?.salePrice}
                      </span>
                      <span className="fw-bold text-muted text-decoration-line-through fs-8">
                        ₹{item?.price}
                      </span>
                      {item?.discount && (
                        <span className="badge bg-success">
                          {item?.discount}% off
                        </span>
                      )}
                    </div>
                    <p>{item?.description}</p>
                  </div>
                </Link>
                <div className="ms-auto pe-2">
                  <Trash 
                    size={22}
                    color="gray"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleRemove(item?.productId)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  ) : (
    // </Card>
    <WishListSkeleton />
  );
}

export default Wishlist;

function WishListSkeleton({ count = 2 }) {
  const placeholders = Array(count).fill(0);

  return (
    <div className="container py-4">
      <h2 className="mb-4 fw-semibold">My Wishlist</h2>

      <div className="d-flex flex-column gap-3">
        {placeholders.map((_, index) => (
          <div className="card flex-row align-items-center p-2" key={index}>
            {/* Image Placeholder */}
            <div
              className="bg-secondary placeholder-glow"
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "5px",
              }}
            >
              <div className="placeholder w-100 h-100" />
            </div>

            {/* Text Placeholder */}
            <div className="flex-grow-1 px-3">
              <p className="placeholder-glow mb-1">
                <span className="placeholder col-6"></span>
              </p>
              <p className="placeholder-glow mb-2">
                <span className="placeholder col-4 me-2"></span>
                <span className="placeholder col-2"></span>
              </p>
              <p className="placeholder-glow mb-0">
                <span className="placeholder btn btn-sm col-4"></span>
              </p>
            </div>

            {/* Icon Placeholder */}
            <div className="ms-auto pe-2 placeholder-glow">
              <span
                className="placeholder rounded-circle"
                style={{
                  width: "22px",
                  height: "22px",
                  display: "inline-block",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
