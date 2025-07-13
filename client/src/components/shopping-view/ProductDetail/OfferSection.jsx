// components/ProductDetail/OffersSection.jsx
import React from 'react';

const OffersSection = ({ product }) => (
  <div className="mb-3">
    <h6>Available Offers</h6>
    <ul className="list-unstyled">
      {/* {offers.map((offer, i) => (
        <li key={i}>🔸 {offer}</li>
      ))} */}
    </ul>
  </div>
);

export default OffersSection;