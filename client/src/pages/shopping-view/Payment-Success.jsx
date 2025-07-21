import { CheckCircle } from "lucide-react";
import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// import { CheckCircle } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";


const PaymentSuccess = () => {
  const navigate = useNavigate();
   const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { orderList, isLoading } = useSelector((state) => state.userOrder);
  

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
          <p><strong>Order ID:</strong> MBZ123456</p>
          <p><strong>Total Paid:</strong> ₹1,650.00</p>
          <p><strong>Payment Mode:</strong> PayPal</p>
        </div>

        <button
         
          className="mt-3 btn btn-success"
          onClick={() => navigate("/shop/account/orders")}
        >
          View My Orders
        </button>
        <button
        
          className="mt-2 btn btn-outline-primary"
          onClick={() => navigate("/")}
        >
          Continue Shopping
        </button>
      </Card>
    </Container>
  );
};

export default PaymentSuccess;
