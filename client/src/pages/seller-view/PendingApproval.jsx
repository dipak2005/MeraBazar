import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpecificSellerInfo } from "../../store/seller/UserSlice";
import { Spinner, Alert, Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PendingApproval = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { sellerdetail } = useSelector((state) => state.getUser);
  const [sellerInfo, setSellerInfo] = useState(null);

  // Initial fetch
  useEffect(() => {
    if (user?.email) {
      dispatch(getSpecificSellerInfo(user.email));
    }
  }, [dispatch, user]);

  // Update local state when redux updates
  useEffect(() => {
    if (sellerdetail) {
      setSellerInfo(sellerdetail);
    }
  }, [sellerdetail]);

  const isApproved = sellerInfo?.sellerinfo?.isapproved;

  // Auto-refresh by polling every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (user?.email) {
        dispatch(getSpecificSellerInfo(user.email)); // Re-fetch latest approval status
      }
    }, 5000);

    return () => clearInterval(interval); // Clear on unmount
  }, [dispatch, user]);

  // Navigate if approved
  useEffect(() => {
    if (isApproved) {
      navigate("/seller/dashboard");
    }
  }, [isApproved, navigate]);

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Row>
        <Col>
          <Card className="p-4 shadow-lg text-center" style={{ minWidth: "350px" }}>
            <h2 className="mb-3">Approval Pending</h2>
            <Alert variant="warning">
              Your seller account is currently pending admin approval.
            </Alert>
            <p>
              Please wait while we verify your details. This page will refresh automatically once you're approved.
            </p>
            <Spinner animation="border" variant="primary" className="mt-3" />
            <p className="text-muted mt-2">
              Checking status every 5 seconds...
            </p>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PendingApproval;
