import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import useAuth from "../hooks/useAuth";

const EmptyBugItem = () => {
  const { auth } = useAuth();

  return (
    <Card className="mb-3" bg="white" text="black">
      <Card.Header>
        <Row>
          <Col className="d-flex justify-content-center mt-2 text-center">
            {"N/A"}
          </Col>
          <Col className="d-flex justify-content-center mt-2 text-center">
            {"N/A"}
          </Col>
          <Col className="d-flex justify-content-center mt-2 text-center">
            {"N/A"}
          </Col>
          <Col></Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <Card.Subtitle className="mb-3">Bugs:</Card.Subtitle>
        <Card.Text>No bugs {auth.roles[0]==="programmer"?"assigned by manager":"submitted by users"} yet.</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default EmptyBugItem;
