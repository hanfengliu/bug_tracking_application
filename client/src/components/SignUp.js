import Axios from "axios";
import { Form, Button, ButtonGroup, Row, Col, Alert } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,24}$/;
const EML_REGEX = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [ValidPassword, setValidPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [matchPassword, setMatchPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [color, setColor] = useState("");

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidEmail(EML_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
    setMatchPassword(password === confirmPassword);
  }, [password, confirmPassword]);

  useEffect(() => {
    setShowMessage(false);
  }, [email]);

  useEffect(() => {
    setShowMessage(false);
  }, []);

  useEffect(() => {
    setShowMessage(true);
  }, [message]);

  const addUser = (e) => {
    e.preventDefault();

    Axios.post("http://localhost:3001/signUp", {
      firstName: firstName,
      lastName: lastName,
      user: user,
      email: email,
      password: password,
    })
      .then((res) => {
        console.log(res.data);
        // console.log(res.data.status === 409);
        setShowMessage(true);
        if (res.data.status === 409) {
          setMessage("Email Taken");
          setColor("danger");
        } else if (res.data.status === 200) {
          setMessage("Successfully Registered");
          setColor("success");
          clearForm(e);
        } else {
          setMessage("Someting went wrong, try again later");
          setColor("danger");
        }
      })
      .catch((err) => {
        console.log(err);
        if (!err?.response) {
          setMessage("No Server Response");
          setColor("danger");
        }
      });
  };

  const clearForm = (e) => {
    e.target.reset();
    setFirstName("");
    setLastName("");
    setUser("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <Form
      className="mx-auto mt-5"
      style={{ width: "680px" }}
      onSubmit={addUser}
    >
      <h1 className="text-center mb-4">Sign up Form</h1>
      <Alert
        className="pb-0"
        variant={color}
        show={message !== "" && showMessage}
      >
        <Alert.Heading>SignUp Message</Alert.Heading>
        <p>{message}</p>
      </Alert>
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
          <Form.Label>User name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your User name:"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
          />
        </Form.Group>
      </Row>
      <Alert className="pb-0" variant="danger" show={user !== "" && !validName}>
        <Alert.Heading>Invalid User name</Alert.Heading>
        <p>
          First must be a letter<br></br>
          Need at least 4 characters
        </p>
      </Alert>
      <Row className="mb-3">
        <Form.Group>
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email:"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
      </Row>
      <Alert
        className="pb-0"
        variant="danger"
        show={email !== "" && !validEmail}
      >
        <Alert.Heading>Invalid Email Address</Alert.Heading>
        <p>
          Email Address must in form similar to email@email.com<br></br>
          Cannot have space between<br></br>
          All Lowercase
        </p>
      </Alert>
      <Row className="mb-3">
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password:"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
      </Row>
      <Alert
        className="pb-0"
        variant="danger"
        show={password !== "" && !ValidPassword}
      >
        <Alert.Heading>Invalid Password</Alert.Heading>
        <p>
          At least one upper case English letter<br></br>
          At least one lower case English letter<br></br>
          At least one digit<br></br>
          At least one special character<br></br>
          Minimum of 8 and Maximum of 24 in length
        </p>
      </Alert>
      <Row className="mb-3">
        <Form.Group>
          <Form.Label>Confirmed Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Comfired your password:"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Form.Group>
      </Row>
      <Alert
        className="pb-0"
        variant="danger"
        show={confirmPassword !== "" && !matchPassword}
      >
        <Alert.Heading>
          Password and Confirmed Password Must be the same
        </Alert.Heading>
        <p>
          Please check your input for password and confirmed password<br></br>
        </p>
      </Alert>
      <Row className="mb-3">
        <Col>
          <ButtonGroup className="d-flex">
            <Button
              variant="primary"
              type="submit"
              disabled={
                !validName || !validEmail || !ValidPassword || !matchPassword
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
        <Col>
          <Link to="/SignIn" style={{ textDecoration: "none" }}>
            <ButtonGroup className="d-flex">
              <Button variant="secondary">Return</Button>
            </ButtonGroup>
          </Link>
        </Col>
      </Row>
    </Form>
  );
};

export default SignUp;
