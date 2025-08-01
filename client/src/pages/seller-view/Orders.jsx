import React, { useEffect, useState } from "react";
import { Button, Card, Modal, Placeholder, Table } from "react-bootstrap";
import OrderDetailsModel from "../../components/seller-view/OrderDetails";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrderBySeller,
  getAllOrdersForSeller,
  getOrderDetailsForSeller,
  resetOrderDetails,
} from "../../store/seller/OrderSlice";

function SellerOrder() {
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const dispatch = useDispatch();

  const { orderList, isLoading,  sellerOrderDetails,orderDetails } =
    useSelector((state) => state.sellerOrder);
  const { user } = useSelector((state) => state.auth);

useEffect(() => {
  if (user?.id) {
    dispatch(fetchOrderBySeller({ sellerId: user?.id }));
    // dispatch(getAllOrdersForSeller());
  }
}, [dispatch, user?.id]);


  const handleViewDetail = (getId) => {
    console.log("Selected Order ID:", getId);
    dispatch(resetOrderDetails());
    dispatch(getOrderDetailsForSeller(getId));
      setShowModal(true);
  };

  useEffect(() => {
    if (orderDetails != null) {
    
      setSelectedOrder(orderDetails);
    }
  }, [orderDetails]);

  console.log(orderDetails, "seller");
  console.log(user?.id, "id");


  return (
    
    !isLoading ? (
      <Card className="w-100">
        <h5 className="text-muted p-3">Order Histroy</h5>
        <div>
          <Table responsive className="table table-dakr align-middle">
            <thead>
              <tr>
                <th className="px-5">Product</th>
                <th className="px-5">Order Date</th>
                <th className="px-3">Status</th>
                <th className="px-5">Price</th>
                <th className="px-5">Details</th>
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
                        onClick={() =>{
                           handleViewDetail(order._id)
                           console.log(order._id)
                        }}
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
                    <img
                      src="/images/box.png"
                      alt="No orders"
                      width={80}
                      className="mb-2"
                    />
                    <div>No orders found.</div>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>

        <Modal
          show={showModal}
          onHide={() => {
            setShowModal(false), dispatch(resetOrderDetails());
          }}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Order Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedOrder && (
              <OrderDetailsModel
                sellerOrderDetails={selectedOrder}
                // order={selectedOrder}
                setShowModal={setShowModal}
              />
            )}
          </Modal.Body>
        </Modal>
      </Card>
    ) : (
      <SellerOrderSkeleton />
    )
  );
}

export default SellerOrder;

const SellerOrderSkeleton = () => {
  const renderRows = () =>
    Array.from({ length: 3 }).map((_, index) => (
      <tr key={index}>
        <td className="px-3">
          <Placeholder
            as="div"
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
    <Card className="w-100">
      <h5 className="text-muted p-3">Order History</h5>
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
        <tbody>{renderRows()}</tbody>
      </Table>
    </Card>
  );
};
