import React, { useState } from "react";
import { Button, Card, Modal, Table } from "react-bootstrap";
import OrderDetails from "../../components/seller-view/OrderDetails";

function SellerOrder() {
  const [showModal, setShowModal] = useState(false);
  return (
    <Card className="w-100">
      <h5 className="text-muted p-3">Order Histroy</h5>
      <div>
        <Table responsive className="table table-bordered align-middle">
          <thead>
            <tr>
              <th className="px-5">Product</th>
              <th className="px-5">Order Date</th>
              <th className="px-5">Status</th>
              <th className="px-5">Price</th>
              <th className="px-5">Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-3">
                <img
                  src="https://rukminim2.flixcart.com/image/240/240/kz1lle80/smartwatch/m/f/q/-original-imagb54tb6fpurze.jpeg?q=60"
                  alt=""
                  style={{
                    width: " 100px",
                    height: "100px",
                    objectFit: "contain",
                  }}
                  className="me-3"
                />
              </td>
              <td className="px-5">27/05/2005</td>
              <td className="px-5">in Process</td>
              <td className="px-5">$1000</td>
              <td className="px-5 ">
                {/* <Modal
                  show={showModal}
                  onHide={() => {
                    setShowModal(false);
                  }}
                > */}
                <button
                  onClick={() => setShowModal(true)}
                  className="btn btn-outline-primary"
                >
                  View Detail
                </button>
                {/* <OrderDetails/> */}
                {/* </Modal> */}
              </td>
            </tr>
          </tbody>
        </Table>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          {/* <Modal.Title>Order Details</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
       <OrderDetails showModal={showModal} setShowModal={setShowModal}/>
        </Modal.Body>
        {/* <Modal.Footer>
          <button className="btn btn-outline-danger" onClick={() => setShowModal(false)}>
            Close
          </button>
        </Modal.Footer> */}
      </Modal>
    </Card>
  );
}

export default SellerOrder;
