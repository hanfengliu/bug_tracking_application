import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Card, ButtonGroup, Button, Row, Col } from "react-bootstrap";

const Unauthorized = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const goBack = () => {
    if (auth?.roles?.includes("manager")) {
      navigate("/Interface");
    } else if (auth?.roles?.includes("programmer")) {
      navigate("/UserForm");
    } else if (auth?.roles?.includes("user")) {
      navigate("/UserForm");
    } else {
      navigate("/SignIn");
    }
  };

  return (
    <Card className="mx-auto mt-5" style={{ width: "18rem" }}>
      <Card.Header as="h1">Unauthorized</Card.Header>
      <Card.Body>
        <Card.Text>
          Your role as {auth.roles} do not have access to the requested page.
        </Card.Text>
        <Row>
          <Col>
            <ButtonGroup className="d-flex">
              <Button variant="success" onClick={goBack}>
                Return
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Unauthorized;
