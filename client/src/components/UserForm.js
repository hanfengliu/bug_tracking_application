import Axios from "axios";
import {
  Form,
  Button,
  ButtonGroup,
  Row,
  Col,
  FloatingLabel,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import Navbar from "./Navbar";
import FormSubmitMessage from "./FormSubmitMessage";
import useAuth from "../hooks/useAuth";

const UserForm = () => {
  const { auth } = useAuth();
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
  const [severity, setSeverity] = useState("");
  const [score, setScore] = useState(0);
  const [numClick, setNumClick] = useState(0);
  const [bugsList, setBugsList] = useState([]);
  const [detail, setDetail] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [status, setStatus] = useState(false);

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

    var avgScore = score / numClick;
    if (avgScore > 25) setSeverity("critical");
    else if (avgScore > 17) setSeverity("moderate");
    else setSeverity("minor");

    Axios.post("http://localhost:3001/create", {
      id: auth.id,
      year: year,
      month: month,
      day: day,
      browser: browser,
      os: os,
      url: URL,
      bugs: JSON.stringify(bugs),
      message: message,
      procedure: procedure,
      severity: severity,
    })
      .then((res) => {
        console.log(res.data);
        setShowModal(true);
        if (res.status === 200) {
          setSubmitMessage(
            "Bug Successfully Submitted. Thank you for your submission"
          );
          setStatus(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setShowModal(true);
        setStatus(false);
        if (!err?.response) {
          setSubmitMessage(
            "No Server Response. Please try again later. We are sorry for any inconvenience."
          );
        } else if (err?.response?.status === 500) {
          setSubmitMessage(
            "Something went Wrong. Please try again later. We are sorry for any inconvenience."
          );
        }
      });
    //clearForm(e);
  };

  const clearForm = (e) => {
    e.target.reset();
    setDate("");
    setURL("");
    setMessage("");
    setProcedure("");
    setBugs([]);
    setBugsList([]);
  };

  return (
    <Form
      className="mx-auto mt-5 mb-5"
      variant="bg-primary"
      style={{ width: "680px" }}
      onSubmit={addBug}
    >
      <Navbar />
      <Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your First Name"
            value={auth.firstName}
            required
            disabled
          />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your Last Name"
            value={auth.lastName}
            required
            disabled
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group>
          <Form.Label>
            <OverlayTrigger
              placement="right"
              delay={{ show: 250, hide: 400 }}
              overlay={<Tooltip>Required</Tooltip>}
            >
              <Button className="p-0" variant="white">
                Bug Discover Date:
              </Button>
            </OverlayTrigger>
          </Form.Label>
          <Form.Control
            type="date"
            value={date}
            onChange={(e) => convertTime(e.target.value)}
            style={{ boxShadow: "none" }}
            required
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Label>
            <OverlayTrigger
              placement="right"
              delay={{ show: 250, hide: 400 }}
              overlay={<Tooltip>Required</Tooltip>}
            >
              <Button className="p-0" variant="white">
                Brower:
              </Button>
            </OverlayTrigger>
          </Form.Label>
          <Form.Select
            onChange={(e) => setBrowser(e.target.value)}
            style={{ boxShadow: "none" }}
            required
          >
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
          <Form.Label>
            <OverlayTrigger
              placement="right"
              delay={{ show: 250, hide: 400 }}
              overlay={<Tooltip>Required</Tooltip>}
            >
              <Button className="p-0" variant="white">
                Operating System:
              </Button>
            </OverlayTrigger>
          </Form.Label>
          <Form.Select
            onChange={(e) => setOS(e.target.value)}
            style={{ boxShadow: "none" }}
            required
          >
            <option value="">Select your Operating System</option>
            <option value="Window 11">Window 11</option>
            <option value="Window 10">Window 10</option>
            <option value="Mac Os">Mac Os</option>
            <option value="Window 7">Window 7</option>
            <option value="Linux">Linux</option>
          </Form.Select>
        </Form.Group>
      </Row>

      <Row>
        <Form.Label>
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={<Tooltip>Required</Tooltip>}
          >
            <Button className="p-0" variant="white">
              Software Bug:
            </Button>
          </OverlayTrigger>
        </Form.Label>
        <Form.Group style={{ overflowY: "scroll", height: "200px" }}>
          {bugsList.map((bug) => (
            <Form.Check
              key={bug.bugId}
              type="checkbox"
              name={bug.bugName}
              label={bug.bugName}
              defaultChecked={false}
              onChange={(e) => {
                changeBugList(e, bug.bugName, bug.score);
              }}
              style={{ boxShadow: "none" }}
            />
          ))}
        </Form.Group>
      </Row>

      <Row>
        <Col className="d-flex justify-content-end">
          <OverlayTrigger
            placement="left"
            delay={{ show: 250, hide: 1000 }}
            overlay={
              <Tooltip>
                {detail ? "Hide Detailed Form" : "Display Detailed Form"}
              </Tooltip>
            }
          >
            <Button
              variant="light"
              onClick={() => {
                setDetail(!detail);
              }}
              style={{ boxShadow: "none" }}
              className={detail ? "" : "mb-2"}
            >
              <FontAwesomeIcon
                icon={detail ? faMinus : faPlus}
                style={{ height: "10px" }}
              />
            </Button>
          </OverlayTrigger>
        </Col>
      </Row>

      <Row className={detail ? "mb-3" : " mb-3 d-none"}>
        <Form.Group as={Col}>
          <Form.Label>Bug URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the URL"
            value={URL}
            onChange={(e) => setURL(e.target.value)}
            style={{ boxShadow: "none" }}
          />
        </Form.Group>
      </Row>

      <Row className={detail ? "mb-4" : " mb-4 d-none"}>
        <Form.Group>
          <Form.Label>Error Message</Form.Label>
          <FloatingLabel controlId="floatingTextarea2" label="Message">
            <Form.Control
              as="textarea"
              placeholder="Enter the Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{ height: "100px", boxShadow: "none" }}
            />
          </FloatingLabel>
        </Form.Group>
      </Row>

      <Row className={detail ? "mb-3" : " mb-3 d-none"}>
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
              style={{ height: "200px", boxShadow: "none" }}
            />
          </FloatingLabel>
        </Form.Group>
      </Row>
      <Row>
        <Col>
          <ButtonGroup className="d-flex">
            <Button
              variant="primary"
              type="submit"
              disabled={
                date === "" || browser === "" || os === "" || numClick <= 0
                  ? true
                  : false
              }
            >
              Submit
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
      <Row>
        <FormSubmitMessage
          show={showModal}
          onHide={() => setShowModal(false)}
          submitMessage={submitMessage}
          status={status}
        />
      </Row>
    </Form>
  );
};

export default UserForm;
