import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react"; 
function NotFound() {
    const navigate = useNavigate();

  return (
    <Container
      className="d-flex flex-column justify-content-center align-items-center text-center"
      style={{ height: "80vh" }}
    >
      <AlertTriangle size={80} color="#2874f0" className="mb-4" />
      <h2 className="mb-2 fw-bold">Oops! We couldn’t find that page.</h2>
      <p className="text-muted mb-4">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Button variant="primary" onClick={() => navigate("/")}>
        Go to Homepage
      </Button>
    </Container>
  );
}

export default NotFound;