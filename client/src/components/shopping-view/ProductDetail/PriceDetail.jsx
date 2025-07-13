import React from "react";

const PriceDetails = ({ cartItems }) => {
  if (!cartItems || cartItems?.length === 0) return null;

  const totalItems = cartItems?.reduce((acc, item) => acc + (item.quantity || 1), 0);

  const totalPrice = cartItems?.reduce(
    (acc, item) => acc + (item.productId?.price || 0) * (item.quantity || 1),
    0
  );

  const discount = Math.round(totalPrice * 0.1); // 10% off
  const deliveryCharge = totalPrice > 500 ? 0 : 40;
  const grandTotal = totalPrice - discount + deliveryCharge;

  return (
    <div className="bg-white p-3 rounded shadow-sm">
      <h5 className="mb-3">PRICE DETAILS</h5>
      <hr />
      <div className="d-flex justify-content-between">
        <span>Price ({totalItems} items)</span>
        <span>₹{totalPrice}</span>
      </div>
      <div className="d-flex justify-content-between text-success">
        <span>Discount</span>
        <span>− ₹{discount}</span>
      </div>
      <div className="d-flex justify-content-between">
        <span>Delivery Charges</span>
        <span>{deliveryCharge === 0 ? "Free" : `₹${deliveryCharge}`}</span>
      </div>
      <hr />
      <div className="d-flex justify-content-between fw-bold">
        <span>Total Amount</span>
        <span>₹{grandTotal}</span>
      </div>
      <button className="btn btn-success w-100 mt-3">Place Order</button>
    </div>
  );
};

export default PriceDetails;
