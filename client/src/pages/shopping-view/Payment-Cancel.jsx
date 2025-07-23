import React from "react";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { XCircle } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

const PaymentCancelled = () => {
  const navigate = useNavigate();

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <Card className="text-center shadow p-4" style={{ maxWidth: "500px", width: "100%" }}>
        <XCircle color="red" size={70} className="mx-auto mb-3" />
        <h4 className="text-danger mb-2">Payment Cancelled</h4>
        <p className="text-muted">
          Your payment was not successful. This could be due to cancellation, network issues, or insufficient funds.
        </p>
        <Row className="mt-4">
          <Col>
            <button  className="w-100 btn btn-outline-primary" onClick={() => navigate("/shop/checkout")}>
              Retry Payment
            </button>
          </Col>
          <Col>
            <button className="w-100 btn btn-outline-success" onClick={() => navigate("/")}>
              Back to Home
            </button>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default PaymentCancelled;
