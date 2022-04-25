import Axios from "axios";
import {
  CardGroup,
  InputGroup,
  Card,
  Form,
  Button,
  ButtonGroup,
  Row,
  Col,
  Alert,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BugItems from "./BugItems";

const Interface = () => {
  const [bugsList, setBugsList] = useState([]);
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    setSortBy("ID");
    Axios.get("http://localhost:3001/getAllBugs").then((response) => {
      setBugsList(response.data);
    });
  }, []);

  useEffect(() => {
    console.log(bugsList);
  }, [bugsList]);

  return (
    <>
      <Card className="mt-3 mb-3">
        <Row className="m-3">
          <Col>
            <h2>Welcome, Manager XYZ</h2>
          </Col>
          <Col>
            <Link
              to="/SignIn"
              style={{ textDecoration: "none", color: "white" }}
            >
              <ButtonGroup style={{ width: "100%" }}>
                <Button variant="success">Sign Out</Button>
              </ButtonGroup>
            </Link>
          </Col>
        </Row>
      </Card>

      <Row>
        <Col sm="3">
          <Card border="secondary" bg={"light"}>
            <Card.Header as="h1">Severity</Card.Header>
            <Card.Body>
              <Card.Text as="h5" className="m-2">
                Choose One following to filter the bugs:
              </Card.Text>
              <Row style={{ width: "100%", textAlign: "center" }}>
                <Button className="m-2" variant="primary">
                  All
                </Button>
                <Button className="m-2" variant="danger">
                  Critical
                </Button>
                <Button className="m-2" variant="warning">
                  Moderate
                </Button>
                <Button className="m-2" variant="success">
                  Minor
                </Button>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col sm="9">
          <Card>
            <Card.Header as="h1">
              <InputGroup>
                <InputGroup.Text>Sort By:</InputGroup.Text>
                <DropdownButton variant="outline-secondary" title={sortBy}>
                  <Dropdown.Item
                    as="button"
                    value="ID"
                    onClick={(e) => setSortBy(e.target.value)}
                  >
                    ID
                  </Dropdown.Item>
                  <Dropdown.Item
                    as="button"
                    value="Date"
                    onClick={(e) => setSortBy(e.target.value)}
                  >
                    Date
                  </Dropdown.Item>
                </DropdownButton>
                <Form.Control type="text" placeholder="Search . . ." />
              </InputGroup>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col className="d-flex justify-content-center">Bug ID</Col>
                <Col className="d-flex justify-content-center">Status</Col>
                <Col className="d-flex justify-content-center">Programmer</Col>
                <Col></Col>
              </Row>
            </Card.Body>
          </Card>
          <BugItems bugsList={bugsList} />
        </Col>
      </Row>
    </>
  );
};

export default Interface;
