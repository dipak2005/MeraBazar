// components/ProductDetail/Highlights.jsx
import React from 'react';

const Highlights = ({ highlights }) => (
  <div className="mb-3">
    <h6>Highlights</h6>
    <ul className="list-unstyled">
      {/* {highlights.map((item, i) => (
        <li key={i}> {item}</li>
      ))} */}
    </ul>
  </div>
);

export default Highlights;