import React, { useEffect, useState } from "react";
import { Card, Modal, Placeholder, Table } from "react-bootstrap";
import OrderDetails from "../../../components/shopping-view/OrderDetails";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersByUserId,
  getOrderDetails,
  resetOrderDetails,
} from "../../../store/shop/orderSlice";
import OrderDetailsModal from "../../../components/shopping-view/OrderDetails";

function Orders() {
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderList, isLoading, orderDetails } = useSelector(
    (state) => state.userOrder
  );

  const handleViewDetail = (getId) => {
    dispatch(getOrderDetails(getId));
  };

  useEffect(() => {
    if (user?.id) {
      dispatch(getAllOrdersByUserId(user?.id));
    }
  }, [dispatch, user?.id]);

  useEffect(() => {
    if (orderDetails !== null) {
      setShowModal(true);
      setSelectedOrder(orderDetails?._id);
    }
  }, [orderDetails]);

  console.log(orderDetails, "orderDetails");

  return !isLoading ? (
    <Card className="p-3">
      <h5 className="text-muted">Order History</h5>
      <div>
        <Table responsive className="align-middle">
          <thead>
            <tr>
              <th className="px-5">Product</th>
              <th className="px-5">Order Date</th>
              <th className="px-3">Status</th>
              <th className="px-5">Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orderList && orderList.length > 0 ? (
              orderList.map((order) => (
                <tr key={order._id}>
                  <td className="px-3">
                    <img
                      src={order?.cartItems?.[0]?.image}
                      alt="Product"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "contain",
                      }}
                      className="me-3"
                    />
                  </td>
                  <td className="px-5">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  {/* className={`badge ${
                address.place === "home" ? "bg-success" : "bg-primary"
              }   fw-bold mb-2 text-capitalize`} */}
                  <td>
                    <span
                      className={`badge px-1 py-2 bg-${
                        order?.orderStatus === "pending"
                          ? "primary"
                          : order?.orderStatus === "rejected"
                          ? "danger"
                          : order?.orderStatus === "delivered"
                          ? "success"
                          : "info"
                      } text-white text-uppercase`}
                    >
                      {order?.orderStatus}
                    </span>
                  </td>
                  <td className="px-5">
                    <b>₹{order.totalAmount.toLocaleString("en-IN")}</b>
                  </td>
                  <td className="px-5">
                    <button
                      onChange={() => {
                        setShowModal(false);
                        dispatch(resetOrderDetails());
                      }}
                      onClick={() => handleViewDetail(order?._id)}
                      className="btn btn-outline-primary"
                    >
                      View Detail
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-muted">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <OrderDetailsModal
              orderDetails={orderDetails}
              order={selectedOrder}
              setShowModal={setShowModal}
            />
          )}
        </Modal.Body>
      </Modal>
    </Card>
  ) : (
    <OrderHistorySkeleton />
  );
}

export default Orders;

const OrderHistorySkeleton = () => {
  const renderSkeletonRows = () =>
    Array.from({ length: 3 }).map((_, index) => (
      <tr key={index}>
        <td className="px-3">
          <Placeholder
            animation="glow"
            style={{ width: "100px", height: "100px" }}
            className="bg-secondary rounded"
          />
        </td>
        <td className="px-5">
          <Placeholder animation="glow">
            <Placeholder xs={6} />
          </Placeholder>
        </td>
        <td className="px-5">
          <Placeholder animation="glow">
            <Placeholder xs={5} />
          </Placeholder>
        </td>
        <td className="px-5">
          <Placeholder animation="glow">
            <Placeholder xs={4} />
          </Placeholder>
        </td>
        <td className="px-5">
          <Placeholder.Button variant="outline-primary" xs={6} />
        </td>
      </tr>
    ));

  return (
    <Card className="p-3">
      <h5 className="text-muted">Order History</h5>
      <Table responsive className="align-middle">
        <thead>
          <tr>
            <th className="px-5">Product</th>
            <th className="px-5">Order Date</th>
            <th className="px-5">Status</th>
            <th className="px-5">Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{renderSkeletonRows()}</tbody>
      </Table>
    </Card>
  );
};
