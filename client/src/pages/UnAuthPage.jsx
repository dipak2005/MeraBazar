import React from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react"; 

function UnAuthPage() {
    const navigate = useNavigate();
    return ( 
        <Container className="d-flex flex-column justify-content-center align-items-center" style={{ height: "80vh" }}>
      <div className="text-center">
        <Lock size={60} color="#2874f0" className="mb-3" />
        <h2 className="text-danger fw-bold">Access Denied</h2>
        <p className="text-muted">
          You don't have permission to view this page. Please log in or check your access level.
        </p>
        <Button variant="primary" onClick={() => navigate("/")}>
          Go to Homepage
        </Button>
      </div>
    </Container>
    )
}

export default UnAuthPage;