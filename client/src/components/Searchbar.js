import React from "react";
import {
  InputGroup,
  Card,
  Form,
  Row,
  Col,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";

const Searchbar = ({ searchBy, setSearchBy, id, setID, date, setDate, assign }) => {
  return (
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
              searchBy === "Date" ? "Search (mm/dd/yyyy) . . ." : "Search . . ."
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
          <Col className="d-flex justify-content-center">{assign}</Col>
          <Col></Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Searchbar;
