import Axios from "axios";
import {
  Form,
  Button,
  ButtonGroup,
  Row,
  Col,
  FloatingLabel,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";

const UserForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [date, setDate] = useState("");
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);
  const [day, setDay] = useState(0);
  const [browser, setBrowser] = useState("");
  const [os, setOS] = useState("");
  const [URL, setURL] = useState("");
  const [bugs, setBugs] = useState([]);
  const [message, setMessage] = useState("");
  const [procedure, setProcedure] = useState("");
  const [score, setScore] = useState(0);
  const [numClick, setNumClick] = useState(0);
  const [bugsList, setBugsList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/getAllBugs").then((response) => {
      setBugsList(response.data);
    });
  }, [bugsList]);

  const convertTime = (str) => {
    var date = new Date(str);
    setDate(str);
    setYear(date.getFullYear());
    setMonth(date.getMonth());
    setDay(date.getUTCDate());
  };

  const changeBugList = (e, bugName, sc) => {
    if (e.target.clicked === undefined) e.target.clicked = true;
    else e.target.clicked = !e.target.clicked;

    if (e.target.clicked) {
      setScore(sc + score);
      setNumClick(numClick + 1);
    } else {
      setScore(score - sc);
      setNumClick(numClick - 1);
    }

    let newList = [...bugs];
    if (e.target.clicked) newList.push(bugName);
    else
      newList = newList.filter((name) => {
        return name !== bugName;
      });
    setBugs(newList);
  };

  const addBug = (e) => {
    e.preventDefault();
    let bugString = "";

    bugs.forEach((bug) => {
      bugString += bug + ";";
    });
    console.log(bugsList);
    console.log(score);
    console.log(numClick);
    var avgScore = score / numClick;
    var severity = "";

    if (avgScore > 25) severity = "critical";
    else if (avgScore > 17) severity = "moderate";
    else severity = "minor";

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
      avgScore: avgScore,
      severity: severity,
    }).then((response) => {
      console.log(response);
    });
    clearForm(e);
  };

  const clearForm = (e) => {
    e.target.reset();
    setFirstName("");
    setLastName("");
    setDate("");
    setURL("");
    setMessage("");
    setProcedure("");
    setBugs([]);
    setBugsList([]);
  };

  return (
    <Form
      className="mx-auto mt-5"
      variant="bg-primary"
      style={{ width: "680px" }}
      onSubmit={addBug}
    >
      <Navbar/>
      <Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
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
            required
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Label>Brower</Form.Label>
          <Form.Select onChange={(e) => setBrowser(e.target.value)} required>
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
          <Form.Select onChange={(e) => setOS(e.target.value)} required>
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
        <Row className="mb-1">
          <ul style={{ overflowY: "scroll", height: "200px" }}>
            {bugsList.map((bug) => (
              <Form.Check
                key={bug.ID}
                type="checkbox"
                name={bug.bugName}
                label={bug.bugName}
                defaultChecked={false}
                onChange={(e) => {
                  changeBugList(e, bug.bugName, bug.score);
                }}
              />
            ))}
          </ul>
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
