import {
  Card,
  Button,
  Row,
} from "react-bootstrap";

const Filterbar = ({setSeverity}) => {
  return (
    <Card border="secondary" bg={"light"}>
      <Card.Header as="h1">Severity</Card.Header>
      <Card.Body>
        <Card.Text as="h5" className="m-2">
          Choose One following to filter the bugs:
        </Card.Text>
        <Row style={{ width: "100%", textAlign: "center" }}>
          <Button
            className="m-2"
            variant="primary"
            value={""}
            onClick={() => setSeverity("")}
          >
            All
          </Button>
          <Button
            className="m-2"
            variant="danger"
            value={"critical"}
            onClick={() => setSeverity("critical")}
          >
            Critical
          </Button>
          <Button
            className="m-2"
            variant="warning"
            value={"moderate"}
            onClick={() => setSeverity("moderate")}
          >
            Moderate
          </Button>
          <Button
            className="m-2"
            variant="success"
            value={"minor"}
            onClick={() => setSeverity("minor")}
          >
            Minor
          </Button>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Filterbar;
