import { Row, Col, Card, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import VerticallyCenteredModal from "./VerticallyCenteredModal";

const BugItem = ({ bug }) => {
  const [detail, setDetail] = useState(false);
  const [reportedBugs, setReportedBugs] = useState([]);
  const [color, setColor] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [programmer, setProgrammer] = useState("N/A");

  useEffect(() => {
    setReportedBugs(bug.software_bug_list.split(";"));
    if (bug.avgScore > 25) setColor("danger");
    else if (bug.avgScore > 17) setColor("warning");
    else setColor("success");
  }, []);

  const changeProgrammer=(prog)=>{
    setProgrammer(prog)
  }

  return (
    <Card
      className="mb-3"
      bg={color}
      text={color === "warning" ? "black" : "white"}
      border="dark"
    >
      <Card.Header>
        <Row>
          <Col className="d-flex justify-content-center mt-2">{bug.id}</Col>
          <Col className="d-flex justify-content-center mt-2">N/A</Col>
          <Col className="d-flex justify-content-center mt-2">{programmer}</Col>
          <Col className="d-flex justify-content-end">
            <Button
              variant="light"
              onClick={() => {
                setDetail(!detail);
              }}
            >
              <FontAwesomeIcon icon={detail ? faArrowUp : faArrowDown} />
            </Button>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col>
            <Card.Subtitle>Bugs:</Card.Subtitle>
            {reportedBugs.map((reportedBug) => (
              <Card.Text key={reportedBug}>{reportedBug}</Card.Text>
            ))}
          </Col>
        </Row>
      </Card.Body>
      <Card.Body className={detail ? "" : "d-none"}>
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
        <Row>
          <Col>
            <small>Last updated 3 mins ago</small>
          </Col>
          <Col className="d-flex justify-content-end">
            <Button variant="primary" onClick={() => setShowModal(true)}>
              Edit
            </Button>
            <VerticallyCenteredModal
              show={showModal}
              onHide={() => setShowModal(false)}
              severity={bug.severity}
              changeProgrammer={changeProgrammer}
            />
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );
};

export default BugItem;
