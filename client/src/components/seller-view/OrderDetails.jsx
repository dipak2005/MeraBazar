import React, { useEffect, useState } from "react";
import Form from "../../common/Form";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForSeller,
  getOrderDetailsForSeller,
  updateOrderStatusBySeller,
} from "../../store/seller/OrderSlice";

import {
  getUserByIdForSeller
} from "../../store/seller/UserSlice";

import { toast } from "react-toastify";


const initialFormData = {
  status: "",
};

function OrderDetailsModel({ sellerOrderDetails, setShowModal }) {
  const [formData, setFormData] = useState(initialFormData);
  const {userdetail} = useSelector((state) => state.getUser);
   const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();


  useEffect(() => {
  if (sellerOrderDetails?.userId) {
    dispatch(getUserByIdForSeller(sellerOrderDetails?.userId));
  }
}, [sellerOrderDetails?.userId, dispatch]);

useEffect(() => {
  if (userdetail) {
    console.log(userdetail, "Fetched user by ID");
  }
}, [userdetail]);
  if (!sellerOrderDetails) return <p>Loading...</p>;

  function handleUpdateStatus(event) {
    event.preventDefault();
    console.log(formData);

    const { status } = formData;

    dispatch(
      updateOrderStatusBySeller({ id: sellerOrderDetails?._id, orderStatus: status })
    ).then((data) => {
      // console.log(data,"sds");
      if (data?.payload?.success) {
        dispatch(getOrderDetailsForSeller(sellerOrderDetails?._id));
        // dispatch(getAllOrdersForSeller());
        setFormData(initialFormData);
        toast.success("Order status updated!");
      }
    });
  }
  console.log(userdetail, "Fetched user by ID");
  

  return (
    <div className="container-fluid px-4">
      <div className="mb-4 border rounded p-3 bg-light">
        <h6 className="fw-bold mb-3">Order Summary</h6>
        <div className="row mb-2">
          <div className="col-6">Order ID</div>
          <div className="col-6 fw-semibold text-end">{sellerOrderDetails?._id}</div>
        </div>
        
        <div className="row mb-2">
          <div className="col-6">Order Date</div>
          <div className="col-6 text-end">
            {new Date(sellerOrderDetails?.createdAt).toLocaleDateString()}
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-6">Shipping Charge</div>
          <div className="col-6 fw-semibold text-end">
            ₹ {sellerOrderDetails?.shippingCharge?.toLocaleString("en-IN")}/-
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-6">Order Total</div>
          <div className="col-6 fw-semibold text-end">
            ₹ {sellerOrderDetails?.totalAmount?.toLocaleString("en-IN")}/-
          </div>
        </div>

        <div className="row">
          <div className="col-6">Order Status</div>
          <div className="col-6 text-end">
            <span
              className={`badge px-3 py-2 text-uppercase bg-${
                sellerOrderDetails?.orderStatus === "pending"
                  ? "warning"
                  : sellerOrderDetails?.orderStatus === "rejected"
                  ? "danger"
                  : sellerOrderDetails?.orderStatus === "Confirmed"
                  ? "primary"
                  : "success"
              } text-white`}
            >
              {sellerOrderDetails.orderStatus}
            </span>
          </div>
        </div>
      </div>

      <div className="mb-4 border rounded p-3">
        <h6 className="fw-bold mb-3">Product Details</h6>
        <ul className="list-unstyled">
          {sellerOrderDetails?.cartItems?.map((item, index) => (
            <li
              key={item._id || index}
              className="d-flex justify-content-between border-bottom py-2"
            >
              <div className="d-flex align-items-center">
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "contain",
                  }}
                  className="me-3"
                />
                <div>
                  <div className="fw-semibold">{item.title}</div>
                  <div className="text-muted small">Qty: {item.quantity}</div>
                </div>
              </div>
              <div className="fw-semibold align-self-center">
                price: ₹ {item?.price?.toLocaleString("en-IN")}/{" "}
                {item.quantity > 1 ? "Qty" : "-"}
              </div>
              {/* <div>
                <div className="fw-semibold align-self-center">
                   Total: ₹ {orderDetails.subtotal.toLocaleString("en-IN")}/-
                </div>
              </div> */}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-4 border rounded p-3 bg-light">
        <h6 className="fw-bold mb-3">Shipping Information</h6>
        <div className="mb-2">
          <strong>Name:</strong> {userdetail?.username}
        </div>
        <div className="mb-2">
          <strong>Address:</strong> {sellerOrderDetails?.addressInfo?.address}
        </div>
        <div className="mb-2">
          <strong>City:</strong> {sellerOrderDetails?.addressInfo?.city}
        </div>
        <div className="mb-2">
          <strong>Pincode:</strong> {sellerOrderDetails?.addressInfo?.pincode}
        </div>
        <div className="mb-2">
          <strong>Phone:</strong> {sellerOrderDetails?.addressInfo?.phone}
        </div>

        {/* <div>
          <strong>Notes:</strong>{" "}
          {orderDetails?.addressInfo?.notes || "No notes"}
        </div> */}
      </div>

      <div className="mb-4 border rounded p-3 bg-light">
        <h6 className="fw-bold mb-3">Payment Information</h6>
        <div className="row mb-2">
          <div className="col-6">PayerID</div>
          <div className="col-6 fw-semibold text-end">
            {sellerOrderDetails?.payerId || "NA"}
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-6">PaymentID</div>
          <div className="col-6 fw-semibold text-end">
            {sellerOrderDetails?.paymentId || "NA"}
          </div>
        </div>
        {/* <div className="row mb-2">
          <div className="col-6">Order Total</div>
          <div className="col-6 fw-semibold text-end">
            ₹ {orderDetails.totalAmount.toLocaleString("en-IN")}
          </div>
        </div> */}
        <div className="row mb-2">
          <div className="col-6">Payment Method</div>
          <div className="col-6 fw-semibold text-end">
            {sellerOrderDetails?.paymentMethod}
          </div>
        </div>
        <div className="row">
          <div className="col-6">Payment Status</div>
          <div className="col-6 text-end">
            <span
              className={`badge px-3 py-2 text-uppercase bg-${
                sellerOrderDetails?.paymentStatus === "pending"
                          ? "primary"
                          : sellerOrderDetails?.paymentStatus === "rejected"
                          ? "danger"
                          : sellerOrderDetails?.paymentStatus === "paid"
                          ? "success"
                          : "info"
              } text-white`}
            >
              {sellerOrderDetails.paymentStatus}
            </span>
          </div>
        </div>
      </div>

      <div className="w-100">
        <Form
          formControls={[
            {
              label: "Order Status",
              name: "status",
              componentType: "select",
              options: [
                { value: "pending", label: "Pending" },
                { value: "inProcess", label: "In Process" },
                { value: "inShipping", label: "In Shipping" },
                { value: "delivered", label: "Delivered" },
                { value: "rejected", label: "Rejected" },
              ],
              value: formData.status || "",
              className:"w-100"
            },
          ]}
          formData={formData}
          setFormData={setFormData}
          buttonText={"Update Order Status"}
          onSubmit={handleUpdateStatus}
        />
      </div>
    </div>
  );
}

export default OrderDetailsModel;
