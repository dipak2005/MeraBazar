import { CheckCircle } from "lucide-react";
import React, { useEffect } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// import { CheckCircle } from "react-bootstrap-icons";
import { useNavigate, useParams } from "react-router-dom";
import {
  getAllOrdersByUserId,
  getOrderDetails,
} from "../../store/shop/orderSlice";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderDetails, isLoading } = useSelector((state) => state.userOrder);
  const {orderId} = useParams();

  useEffect(() => {
      if (orderId) {
        dispatch(getOrderDetails(orderId));
      }
  }, [dispatch, user]);

  
 const handleClick = (() => {
    const audio = new Audio("/sounds/success.mp3");
    audio.load();
     audio.play().catch((err) => {
      console.warn("Auto-play blocked by browser:", err);
    });
  });
  

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center min-vh-100">
      <Card className="shadow-lg p-4 text-center success-card">
        <CheckCircle size={80} className="text-success mb-3 animate-check" />
        <h2 className="text-success">Payment Successful!</h2>
        <p className="text-muted">
          Thank you for your purchase. Your order has been placed successfully.
        </p>

        <hr />

        <div className="text-start mt-3">
          <h5>Order Summary</h5>
          <p>
            <strong>Order ID: </strong> {orderDetails?._id}
          </p>
          <p>
            <strong>Total Paid: </strong>  ₹{" "}
            {orderDetails?.totalAmount?.toLocaleString("en-IN")}/-
          </p>
          <p>
            <strong>Payment Mode:</strong>  {orderDetails?.paymentMethod}
          </p>
        </div>

        <button
          className="mt-3 btn btn-success"
          onClick={() => navigate("/shop/account/orders")}
        >
          View My Orders
        </button>
        <button
          className="mt-2 btn btn-outline-primary"
          onClick={() => {
            handleClick
            navigate("/")
          }}
        >
          Continue Shopping
        </button>
      </Card>
    </Container>
  );
};

export default PaymentSuccess;
