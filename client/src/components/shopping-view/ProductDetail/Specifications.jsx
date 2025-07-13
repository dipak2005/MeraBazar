// components/ProductDetail/Specifications.jsx
import React from 'react';

const Specifications = ({ specs }) => (
  <div className="border-top pt-3 mt-4">
    <h5>Specifications</h5>
    <table className="table table-bordered mt-2">
      <tbody>
        {Object.entries(specs).map(([key, value], i) => (
          <tr key={i}>
            <th style={{ width: '30%' }}>{key}</th>
            <td>{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Specifications;
