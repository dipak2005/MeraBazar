import React from "react";

const PriceDetails = ({ cartItems }) => {
  if (!cartItems || cartItems?.length === 0) return null;

  const totalItems = cartItems?.reduce((acc, item) => acc + (item.quantity || 1), 0);

  const totalPrice = cartItems?.reduce(
    (acc, item) => acc + (item?.salePrice || 0) * (item.quantity || 1),
    0
  );

  const discount = cartItems.reduce((acc, item) => {
  const discountRate = item?.discount || 0;
  const itemDiscount = ((item.salePrice || 0) * discountRate / 100) * (item.quantity || 1);
  return acc + itemDiscount;
}, 0);


  // const discount = Math.round(totalPrice * cartItems.item?.discount); 
  const deliveryCharge = totalPrice > 500 ? 0 : 40;
  const grandTotal = totalPrice - discount + deliveryCharge;

  return (
    <div className="bg-white p-3 rounded shadow-sm">
      <h5 className="mb-3 text-muted">PRICE DETAILS</h5>
      <hr />
      <div className="d-flex justify-content-between my-3">
        <span>Price ({totalItems} items)</span>
        <span>₹{totalPrice.toLocaleString("en-IN")}</span>
      </div>
      <div className="d-flex justify-content-between text-success my-3">
        <span>Discount</span>
        <span>− ₹{discount.toLocaleString("en-IN")}</span>
      </div>
      <div className="d-flex justify-content-between">
        <span>Delivery Charges</span>
        <span>{deliveryCharge === 0 ? "Free" : `₹${deliveryCharge.toLocaleString("en-IN")}`}</span>
      </div>
      <hr />
      <div className="d-flex justify-content-between fw-medium my-3">
        <span style={{fontSize:"1.2rem"}}>Total Amount</span>
        <span className="fw-medium" style={{fontSize:"1.2rem"}}>₹{grandTotal.toLocaleString("en-IN")}</span>
      </div>
     
    </div>
  );
};

export default PriceDetails;
