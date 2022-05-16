import { Row, Col, Card, Button } from "react-bootstrap";
import { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import ManagerModal from "./ManagerModal";
import ProgrammerModal from "./ProgrammerModal";
import useAuth from "../hooks/useAuth";

const BugItem = ({ bug }) => {
  const { auth } = useAuth();
  const [detail, setDetail] = useState(false);
  const [reportedBugs, setReportedBugs] = useState([]);
  const [color, setColor] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [programmer, setProgrammer] = useState(bug.programmer);
  const [manager, setManager] = useState(
    bug.managerFirst + " " + bug.managerLast
  );
  const [severity, setSeverity] = useState(bug.severity);
  const [status, setStatus] = useState(bug.status);

  useEffect(() => {
    setReportedBugs(bug.software_bug_list.split(";"));
    if (severity === "critical") setColor("danger");
    else if (severity === "moderate") setColor("warning");
  }, []);

  useEffect(() => {
    if (severity !== "")
      if (severity === "critical") setColor("danger");
      else if (severity === "moderate") setColor("warning");
      else setColor("success");
  }, [severity]);

  return (
    <Card
      className="mb-3"
      bg={color}
      text={color === "warning" ? "black" : "white"}
      border="dark"
    >
      <Card.Header>
        <Row>
          <Col className="d-flex justify-content-center mt-2 text-center">
            {bug.id}
          </Col>
          <Col className="d-flex justify-content-center mt-2 text-center">
            {status}
          </Col>
          <Col className="d-flex justify-content-center mt-2 text-center">
            {auth.roles[0] === "manager" ? programmer : manager}
          </Col>
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
          {/* <Col>
            <small>Last updated 3 mins ago</small>
          </Col> */}
          <Col className="d-flex justify-content-end">
            <Button variant="primary" onClick={() => setShowModal(true)}>
              Edit
            </Button>
            {auth.roles[0] === "manager" ? (
              <ManagerModal
                show={showModal}
                onHide={() => setShowModal(false)}
                id={bug.id}
                programmer={programmer}
                severity={severity}
                setProgrammer={setProgrammer}
                setSeverity={setSeverity}
                setStatus={setStatus}
              />
            ) : (
              <ProgrammerModal
                show={showModal}
                onHide={() => setShowModal(false)}
                id={bug.id}
                status={status}
                setStatus={setStatus}
              />
            )}
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );
};

export default BugItem;
