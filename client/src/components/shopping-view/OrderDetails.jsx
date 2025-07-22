import React, { useState } from "react";
import { useSelector } from "react-redux";

const initialFormData = {
  status: "",
};

function OrderDetailsModal({ orderDetails, setShowModal }) {
  const [formData, setFormData] = useState(initialFormData);
  const { user } = useSelector((state) => state.auth);

  if (!orderDetails) return <p>Loading...</p>;

  return (
    <div className="container-fluid px-4">
      {/* ORDER Details */}
      <div className="mb-4 border rounded p-3 bg-light">
        <h6 className="fw-bold mb-3">Order Summary</h6>
        <div className="row mb-2">
          <div className="col-6">Order ID</div>
          <div className="col-6 fw-semibold text-end">{orderDetails._id}</div>
        </div>
        <div className="row mb-2">
          <div className="col-6">Order Date</div>
          <div className="col-6 text-end">
            {new Date(orderDetails.createdAt).toLocaleDateString()}
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-6">Shipping Charge</div>
          <div className="col-6 fw-semibold text-end">
            ₹ {orderDetails?.shippingCharge.toLocaleString("en-IN")}/-
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-6">Order Total</div>
          <div className="col-6 fw-semibold text-end">
            ₹ {orderDetails.totalAmount.toLocaleString("en-IN")}/-
          </div>
        </div>

        <div className="row">
          <div className="col-6">Order Status</div>
          <div className="col-6 text-end">
            <span
              className={`badge px-3 py-2 text-uppercase bg-${
                orderDetails.orderStatus === "pending" ? "primary" : "success"
              } text-white`}
            >
              {orderDetails.orderStatus}
            </span>
          </div>
        </div>
      </div>

      {/* PRODUCT DETAILS */}
      <div className="mb-4 border rounded p-3">
        <h6 className="fw-bold mb-3">Product Details</h6>
        <ul className="list-unstyled">
          {orderDetails?.cartItems?.map((item, index) => (
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
                price: ₹ {item?.price.toLocaleString("en-IN")}/{" "}
                {item.quantity > 1 ?"Qty" : "-"}
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

      {/* SHIPPING INFO */}
      <div className="mb-4 border rounded p-3 bg-light">
        <h6 className="fw-bold mb-3">Shipping Information</h6>
        <div className="mb-2">
          <strong>Name:</strong> {user?.username}
        </div>
        <div className="mb-2">
          <strong>Address:</strong> {orderDetails?.addressInfo?.address}
        </div>
        <div className="mb-2">
          <strong>City:</strong> {orderDetails?.addressInfo?.city}
        </div>
        <div className="mb-2">
          <strong>Pincode:</strong> {orderDetails?.addressInfo?.pincode}
        </div>
        <div className="mb-2">
          <strong>Phone:</strong> {orderDetails?.addressInfo?.phone}
        </div>

        {/* <div>
          <strong>Notes:</strong>{" "}
          {orderDetails?.addressInfo?.notes || "No notes"}
        </div> */}
      </div>

      {/* Payment Method */}
      <div className="mb-4 border rounded p-3 bg-light">
        <h6 className="fw-bold mb-3">Payment Information</h6>
        <div className="row mb-2">
          <div className="col-6">PayerID</div>
          <div className="col-6 fw-semibold text-end">
            {orderDetails?.payerId || "NA"}
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-6">PaymentID</div>
          <div className="col-6 fw-semibold text-end">
            {orderDetails?.paymentId || "NA"}
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
            {orderDetails?.paymentMethod}
          </div>
        </div>
        <div className="row">
          <div className="col-6">Payment Status</div>
          <div className="col-6 text-end">
            <span
              className={`badge px-3 py-2 text-uppercase bg-${
                orderDetails.orderStatus === "pending" ? "primary" : "success"
              } text-white`}
            >
              {orderDetails.paymentStatus}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailsModal;
