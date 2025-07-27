import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSellerDetails } from "../../store/admin/seller-listingSlice";
import { useNavigate } from "react-router-dom";
import { Spinner, Alert, Container, Row, Col, Card } from "react-bootstrap";

const PendingApproval = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { seller, loading } = useSelector((state) => state.sellerAuth);
  const [isApproved, setIsApproved] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(getSellerDetails(seller?._id)).then((data) => {
        setIsApproved(data.payload.data.isapproved);
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [dispatch, seller?._id]);

  useEffect(() => {
    if (isApproved) {
      navigate("/seller/dashboard");
    }
  }, [seller?.isapproved, navigate]);

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Row>
        <Col>
          <Card
            className="p-4 shadow-lg text-center"
            style={{ minWidth: "350px" }}
          >
            <h2 className="mb-3">Approval Pending</h2>
            <Alert variant="warning">
              Your seller account is currently pending admin approval.
            </Alert>
            <p>
              Please wait while we verify your details. This page will refresh
              automatically once you're approved.
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
