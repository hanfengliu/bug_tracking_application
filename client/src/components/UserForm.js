import Axios from "axios";
import {
  Form,
  Button,
  ButtonGroup,
  Row,
  Col,
  FloatingLabel,
} from "react-bootstrap";
import { useContext, useEffect, useState } from "react";

const UserForm = () => {
  const bugList = [
    { bugName: "Crash", clicked: false },
    { bugName: "Functional error", clicked: false },
    { bugName: "Typos", clicked: false },
    { bugName: "Missing command", clicked: false },
    { bugName: "Calculation error", clicked: false },
    { bugName: "Control flow error", clicked: false },
  ];

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [date, setDate] = useState("");
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);
  const [day, setDay] = useState(0);
  const [browser, setBrowser] = useState("");
  const [os, setOS] = useState("");
  const [URL, setURL] = useState("");
  const [bugs, setBugs] = useState(bugList);
  const [message, setMessage] = useState("");
  const [procedure, setProcedure] = useState("");
  // const [pref, setPref] = useState({
  //     webcam: false
  // });

  const [bugsList, setBugsList] = useState([]);

  const convertTime = (str) => {
    var date = new Date(str);
    setDate(str);
    setYear(date.getFullYear());
    setMonth(date.getMonth());
    setDay(date.getDay());
  };

  const changeBugList = (e, id) => {
    e.target.clicked = !e.target.clicked;

    let newList = [...bugs];
    newList[id].clicked = e.target.clicked;

    setBugs(newList);
  };

  const addBug = (e) => {
    e.preventDefault();
    let bugString = "";

    bugs.forEach((bug) => {
      if (bug.clicked) bugString += bug.bugName + ",";
    });

    Axios.post("http://localhost:3001/create", {
      first_name: firstName,
      last_name: lastName,
      year: year,
      month: month,
      day: day,
      browser: browser,
      operating_system: os,
      url: URL,
      software_bug_list: bugString,
      message: message,
      procedure: procedure,
    }).then((response) => {
      console.log(response);
    });

    clearForm(e);
  };

  const getAllBugs = () => {
    Axios.get("http://localhost:3001/getAllBugs").then((response) => {
      setBugsList(response.data);
    });
  };

  const clearForm = (e) => {
    e.target.reset();
    setFirstName("");
    setLastName("");
    setDate("");
    setURL("");
    setMessage("");
    setProcedure("");
  };

  return (
    <Form className="mx-auto mt-5" style={{ width: "680px" }} onSubmit={addBug}>
      <Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group>
          <Form.Label>Bug Discover Date:</Form.Label>
          <Form.Control
            type="date"
            value={date}
            onChange={(e) => convertTime(e.target.value)}
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Label>Brower</Form.Label>
          <Form.Select onChange={(e) => setBrowser(e.target.value)}>
            <option value="">Select your Brower</option>
            <option value="Google Chrome">Google Chrome</option>
            <option value="Internet Exploer">Internet Exploer</option>
            <option value="Safari">Safari</option>
            <option value="Firefox">Firefox</option>
            <option value="Microsoft Edge">Microsoft Edge</option>
            <option value="Opera">Opera</option>
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Operating System</Form.Label>
          <Form.Select onChange={(e) => setOS(e.target.value)}>
            <option value="">Select your Operating System</option>
            <option value="Window 11">Window 11</option>
            <option value="Window 10">Window 10</option>
            <option value="Mac Os">Mac Os</option>
            <option value="Window 7">Window 7</option>
            <option value="Linux">Linux</option>
          </Form.Select>
        </Form.Group>
      </Row>

      <Row className="mb-4">
        <Form.Group as={Col}>
          <Form.Label>Gug URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the URL"
            value={URL}
            onChange={(e) => setURL(e.target.value)}
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Label>Software Bug</Form.Label>
        <Row className="mb-1 ">
          <Form.Group as={Col}>
            <Form.Check
              type="checkbox"
              label="Crash"
              name="Crash"
              defaultChecked={false}
              onChange={(e) => {
                changeBugList(e, 0);
              }}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Check
              type="checkbox"
              label="Functional error"
              defaultChecked={false}
              onChange={(e) => {
                changeBugList(e, 1);
              }}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Check
              type="checkbox"
              label="Typos"
              defaultChecked={false}
              onChange={(e) => {
                changeBugList(e, 2);
              }}
            />
          </Form.Group>
        </Row>
        <Row className="mb-1">
          <Form.Group as={Col}>
            <Form.Check
              type="checkbox"
              label="Missing command"
              defaultChecked={false}
              onChange={(e) => {
                changeBugList(e, 3);
              }}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Check
              type="checkbox"
              label="Calculation error"
              defaultChecked={false}
              onChange={(e) => {
                changeBugList(e, 4);
              }}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Check
              type="checkbox"
              label="Control flow error"
              defaultChecked={false}
              onChange={(e) => {
                changeBugList(e, 5);
              }}
            />
          </Form.Group>
        </Row>
      </Row>

      <Row className="mb-4">
        <Form.Group>
          <Form.Label>Error Message</Form.Label>
          <FloatingLabel controlId="floatingTextarea2" label="Message">
            <Form.Control
              as="textarea"
              placeholder="Enter the Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{ height: "100px" }}
            />
          </FloatingLabel>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group>
          <Form.Label>
            Please describe any procedure to replicate this bug
          </Form.Label>
          <FloatingLabel controlId="floatingTextarea2" label="Procedure">
            <Form.Control
              as="textarea"
              placeholder="Enter the URL"
              value={procedure}
              onChange={(e) => setProcedure(e.target.value)}
              style={{ height: "200px" }}
            />
          </FloatingLabel>
        </Form.Group>
      </Row>
      <Row>
        <Col>
          <ButtonGroup className="d-flex">
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
    </Form>
  );
};

export default UserForm;
