import Axios from "axios";
import {
  InputGroup,
  Card,
  Form,
  Button,
  Row,
  Col,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";

import { useEffect, useState, useContext } from "react";
import BugItems from "./BugItems";
import Navbar from "./Navbar";
import useAuth from "../hooks/useAuth";

const Interface = () => {

  const { setAvailableProgrammersList } = useAuth();

  const [bugsList, setBugsList] = useState([]);
  const [searchBy, setSearchBy] = useState("");
  const [fliterList, setFilterList] = useState([]);
  //const [availableProgrammersList, setAvailableProgrammersList] = useState([]);
  const [id, setID] = useState("");
  const [severity, setSeverity] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    setSearchBy("ID");
    Axios.get("http://localhost:3001/getSubmitedBugs").then((response) => {
      setBugsList(response.data);
      setFilterList(response.data);
    });
    Axios.get("http://localhost:3001/getAllAvailableProgrammers").then(
      (response) => {
        setAvailableProgrammersList(response.data);
      }
    );
  }, []);

  useEffect(() => {
    filter();
  }, [severity, id, date]);

  const filter = () => {
    setFilterList(
      searchBy === "Date"
        ? bugsList.filter((bug) => {
            return (
              bug.severity.includes(severity) &&
              (
                bug.month.toString() +
                "/" +
                bug.day.toString() +
                "/" +
                bug.year.toString()
              ).includes(date)
            );
          })
        : bugsList.filter((bug) => {
            return (
              bug.severity.includes(severity) && bug.id.toString().includes(id)
            );
          })
    );
  };

  return (
    <>
      <Navbar />
      <Row>
        <Col sm="3">
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
        </Col>
        <Col sm="9">
          <Card>
            <Card.Header as="h1">
              <InputGroup>
                <InputGroup.Text>Search By:</InputGroup.Text>
                <DropdownButton variant="outline-secondary" title={searchBy}>
                  <Dropdown.Item
                    as="button"
                    value="ID"
                    onClick={(e) => setSearchBy(e.target.value)}
                  >
                    ID
                  </Dropdown.Item>
                  <Dropdown.Item
                    as="button"
                    value="Date"
                    onClick={(e) => setSearchBy(e.target.value)}
                  >
                    Date
                  </Dropdown.Item>
                </DropdownButton>
                <Form.Control
                  type="text"
                  placeholder={
                    searchBy === "Date"
                      ? "Search (mm/dd/yyyy) . . ."
                      : "Search . . ."
                  }
                  value={searchBy === "Date" ? date : id}
                  onChange={(e) =>
                    searchBy === "Date"
                      ? (setDate(e.target.value), setID(""))
                      : (setID(e.target.value), setDate(""))
                  }
                />
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
          <BugItems
            bugsList={fliterList}
          />
        </Col>
      </Row>
    </>
  );
};

export default Interface;
