import { Card, Button, Row } from "react-bootstrap";
import { useEffect, useState } from "react";

const Filterbar = ({ setSeverity, setStatus }) => {
  const [currentSeverity, setCurrentSeverity] = useState("");
  const [hideSeverity, setHideSeverity] = useState(true);
  const [currentStatus, setCurrentStatus] = useState("");
  const [hideStatus, setHideStatus] = useState(true);

  return (
    <>
      <Card border="secondary mb-3" bg={"light"}>
        <Card.Header as="h1">
          Severity
          <Button
            className="mt-3"
            style={{ width: "100%" }}
            onClick={() => setHideSeverity(!hideSeverity)}
          >
            Filter
          </Button>
        </Card.Header>
        <Card.Body className={hideSeverity ? "d-none" : ""}>
          <Row style={{ width: "100%", textAlign: "center" }}>
            <Button
              className="m-2"
              variant="primary"
              value={""}
              style={{ opacity: currentSeverity === "" ? "1" : "0.75" }}
              onClick={(e) => {
                setSeverity(e.target.value);
                setCurrentSeverity(e.target.value);
                console.log(e.target.value);
              }}
            >
              All
            </Button>
            <Button
              className="m-2"
              variant="danger"
              value={"critical"}
              style={{ opacity: currentSeverity === "critical" ? "1" : "0.75" }}
              onClick={(e) => {
                setSeverity(e.target.value);
                setCurrentSeverity(e.target.value);
                console.log(e.target.value);
              }}
            >
              Critical
            </Button>
            <Button
              className="m-2"
              variant="warning"
              value={"moderate"}
              style={{ opacity: currentSeverity === "moderate" ? "1" : "0.75" }}
              onClick={(e) => {
                setSeverity(e.target.value);
                setCurrentSeverity(e.target.value);
                console.log(e.target.value);
              }}
            >
              Moderate
            </Button>
            <Button
              className="m-2"
              variant="success"
              value={"minor"}
              style={{ opacity: currentSeverity === "minor" ? "1" : "0.75" }}
              onClick={(e) => {
                setSeverity(e.target.value);
                setCurrentSeverity(e.target.value);
                console.log(e.target.value);
              }}
            >
              Minor
            </Button>
          </Row>
        </Card.Body>
      </Card>

      <Card border="secondary mb-3" bg={"light"}>
        <Card.Header as="h1">
          Status
          <Button
            className="mt-3"
            style={{ width: "100%" }}
            onClick={() => setHideStatus(!hideStatus)}
          >
            Filter
          </Button>
        </Card.Header>
        <Card.Body className={hideStatus ? "d-none" : ""}>
          <Row style={{ width: "100%", textAlign: "center" }}>
            <Button
              className="m-2"
              variant="primary"
              value={""}
              style={{ opacity: currentStatus === "" ? "1" : "0.75" }}
              onClick={(e) => {
                setStatus(e.target.value);
                setCurrentStatus(e.target.value);
                console.log(e.target.value);
              }}
            >
              All
            </Button>
            <Button
              className="m-2"
              variant="secondary"
              value={"Pending"}
              style={{
                opacity: currentStatus === "Pending" ? "1" : "0.75",
              }}
              onClick={(e) => {
                setStatus(e.target.value);
                setCurrentStatus(e.target.value);
                console.log(e.target.value);
              }}
            >
              Pending
            </Button>
            <Button
              className="m-2"
              variant="danger"
              value={"Investigating"}
              style={{
                opacity: currentStatus === "Investigating" ? "1" : "0.75",
              }}
              onClick={(e) => {
                setStatus(e.target.value);
                setCurrentStatus(e.target.value);
                console.log(e.target.value);
              }}
            >
              Investigating
            </Button>
            <Button
              className="m-2"
              variant="info"
              value={"Fixing"}
              style={{ opacity: currentStatus === "Fixing" ? "1" : "0.75" }}
              onClick={(e) => {
                setStatus(e.target.value);
                setCurrentStatus(e.target.value);
                console.log(e.target.value);
              }}
            >
              Fixing
            </Button>
            <Button
              className="m-2"
              variant="warning"
              value={"Testing"}
              style={{ opacity: currentStatus === "Testing" ? "1" : "0.75" }}
              onClick={(e) => {
                setStatus(e.target.value);
                setCurrentStatus(e.target.value);
                console.log(e.target.value);
              }}
            >
              Testing
            </Button>
            <Button
              className="m-2"
              variant="success"
              value={"Fixed"}
              style={{ opacity: currentStatus === "Fixed" ? "1" : "0.75" }}
              onClick={(e) => {
                setStatus(e.target.value);
                setCurrentStatus(e.target.value);
                console.log(e.target.value);
              }}
            >
              Fixed
            </Button>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default Filterbar;
