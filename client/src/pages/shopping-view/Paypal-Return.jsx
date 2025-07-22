import React, { useEffect } from "react";
import { Card, Container, Spinner } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import SimpleNavbar from "../../common/Navbar";
import { useDispatch } from "react-redux";
import { capturePayment } from "../../store/shop/orderSlice";

function PaypalRetunPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerID");

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (paymentId && payerId) {
        const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));

        dispatch(capturePayment({ paymentId, payerId, orderId })).then(
          (data) => {
            if (data.payload.success) {
              sessionStorage.removeItem("currentOrderId");
              window.location.href = `/shop/payment-success/${orderId}`;
            }
          }
        );
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [paymentId, payerId, dispatch]);

  return (
    <div className="container-fluid">
      {/* <div class="w-100">
        <SimpleNavbar />
      </div> */}
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Card className="p-5 shadow-lg text-center processing-card ">
          <Spinner
            animation="border"
            variant="primary"
            role="status"
            className="mb-4 justify-content-center"
          />
          <h4>Processing Your Payment...</h4>
          <p className="text-muted">
            Please wait while we confirm your payment. Do not refresh or close
            this window.
          </p>
        </Card>
      </Container>
    </div>
  );
}

export default PaypalRetunPage;
