import { Row, Col, Card, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";

const BugItem = ({ bug }) => {
  const [detail, setDetail] = useState(false);

  return (
    <Card className="mb-3">
      <Card.Header>
        <Row>
          <Col className="d-flex justify-content-center mt-2">{bug.id}</Col>
          <Col className="d-flex justify-content-center mt-2">N/A</Col>
          <Col className="d-flex justify-content-center mt-2">N/A</Col>
          <Col className="d-flex justify-content-end">
            <Button variant="light" onClick={() =>{setDetail(!detail)} }>
              <FontAwesomeIcon icon={detail ? faArrowUp : faArrowDown} />
            </Button>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col>
            <Card.Subtitle>Bugs:</Card.Subtitle>
            <Card.Text>{bug.software_bug_list}</Card.Text>
          </Col>
        </Row>
      </Card.Body>
      <Card.Body className={detail?"":"d-none"}>
        <Row className="mb-3">
          <Col>
            <Card.Subtitle>Reporter Name:</Card.Subtitle>
            <Card.Text>
              {bug.first_name} {bug.last_name}
            </Card.Text>
          </Col>
          <Col>
            <Card.Subtitle>Report Date:</Card.Subtitle>
            <Card.Text>
              {bug.month}/{bug.day}/{bug.year}
            </Card.Text>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Card.Subtitle>Browser:</Card.Subtitle>
            <Card.Text>{bug.browser}</Card.Text>
          </Col>
          <Col>
            <Card.Subtitle>Operating System:</Card.Subtitle>
            <Card.Text>{bug.operating_system}</Card.Text>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Card.Subtitle>URL:</Card.Subtitle>
            <Card.Text>{bug.url}</Card.Text>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Card.Subtitle>Message:</Card.Subtitle>
            <Card.Text>{bug.message}</Card.Text>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Card.Subtitle>Procedure:</Card.Subtitle>
            <Card.Text>{bug.procedure}</Card.Text>
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">Last updated 3 mins ago</small>
      </Card.Footer>
    </Card>
  );
};

export default BugItem;
