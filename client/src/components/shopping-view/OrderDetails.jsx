import React, { useState } from "react";

// import { Modal, ModalBody } from "react-bootstrap";

const initialFormData = {
  status: "",
};

function OrderDetails({ showModal, setShowModal }) {
  const [formData, setFormData] = useState(initialFormData);

  function handleUpdateStatus(event) {
    event.preventDefault();
  }
  return (
    <div className="col gap-6">
      <div className="col gap-2">
        <div className="d-flex mt-6 justify-content-center justify-content-between">
          <p className="fs-6">Order ID</p>
          <span className="fw-bold">123456</span>
        </div>
        <div className="d-flex mt-6 justify-content-center justify-content-between">
          <p className="fs-6">Order Date</p>
          <span className="fw-bold">27/05/2005</span>
        </div>
        <div className="d-flex mt-6 justify-content-center justify-content-between">
          <p className="fs-6">Order Price</p>
          <span className="fw-bold">$ 1000</span>
        </div>
        <div className="d-flex mt-6 justify-content-center justify-content-between">
          <p className="fs-6">Status</p>
          <span className="fw-bold">in Process</span>
        </div>
      </div>
      <hr />
      <div className="col gap-4 ">
        <div className="col gap-2 ">
          <div className="fs-5">Order Details</div>
          <ul className="col gap-3">
            <li className="d-flex justify-content-center justify-content-between">
              <span>Product One</span>
              <span>$100</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="col gap-4 ">
        <div className="col gap-2 ">
          <div className="fs-5">Order Details</div>
          <ul className="col gap-3">
            <li className="d-flex justify-content-center justify-content-between">
              <span>Product One</span>
              <span>$100</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="col gap-4 ">
        <div className="col gap-2 ">
          <div className="fs-5">Shipping Info</div>
          <div className="col gap-1 text-muted ">
            <div className="d-flex mt-6 justify-content-center justify-content-between">
              <span>Dipak</span>
            </div>

            <div className="d-flex mt-6 justify-content-center justify-content-between">
              <span>Address</span>
            </div>

            <div className="d-flex mt-6 justify-content-center justify-content-between">
              <span>City</span>
            </div>

            <div className="d-flex mt-6 justify-content-center justify-content-between">
              <span>Pincode</span>
            </div>

            <div className="d-flex mt-6 justify-content-center justify-content-between">
              <span>Phone</span>
            </div>

            <div className="d-flex mt-6 justify-content-center justify-content-between">
              <span>Notes</span>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
}

export default OrderDetails;
