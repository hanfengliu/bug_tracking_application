import Axios from "axios";
import {
  Form,
  Button,
  ButtonGroup,
  Row,
  Col,
  Alert,
  ListGroup,
  InputGroup,
} from "react-bootstrap";
import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEyeSlash,
  faEye,
  faLock,
  faLockOpen,
  faEnvelope,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,10}$/;
const PWD_REGEX =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[-+_!@#$%^&*.,?]).{8,24}$/;
const EML_REGEX = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;

const SignUp = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fullName, setValidFullName] = useState(false);
  const [user, setUser] = useState("");
  const userRef = useRef(null);
  const [validName, setValidName] = useState(false);
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const emailRef = useRef(null);
  const [password, setPassword] = useState("");
  const [ValidPassword, setValidPassword] = useState(false);
  const passRef = useRef(null);
  const [showPass, setShowPass] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [matchPassword, setMatchPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [color, setColor] = useState("");

  useEffect(() => {
    if (auth?.roles?.includes("manager")) {
      navigate("/ManagerInterface");
    } else if (auth?.roles?.includes("programmer")) {
      navigate("/ProgrammerInterface");
    } else if (auth?.roles?.includes("user")) {
      navigate("/UserForm");
    } else {
      navigate("/SignUp");
    }
  }, []);

  useEffect(() => {
    setValidFullName(
      /^[a-zA-Z]+$/.test(firstName) && /^[a-zA-Z]+$/.test(lastName)
    );
  }, [firstName, lastName]);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
    if (userRef.current) {
      const userList = userRef.current;
      if (/^[a-zA-Z].*/.test(user)) userList.children[0].style.color = "green";
      else userList.children[0].style.color = "";
      if (/^.{4,10}$/.test(user)) userList.children[1].style.color = "green";
      else userList.children[1].style.color = "";
    }
  }, [user, userRef]);

  useEffect(() => {
    setValidEmail(EML_REGEX.test(email));
    if (emailRef.current) {
      const emailList = emailRef.current;
      if (/^[a-zA-Z0-9]+(?=@)/.test(email))
        emailList.children[0].style.color = "green";
      else emailList.children[0].style.color = "";
      if (/(?<=@)([a-zA-Z]+)(?=\.)/.test(email))
        emailList.children[1].style.color = "green";
      else emailList.children[1].style.color = "";
      if (/(?<=\.)[a-zA-Z]{2,3}$/.test(email))
        emailList.children[2].style.color = "green";
      else emailList.children[2].style.color = "";
      if (/^\S+$/.test(email)) emailList.children[3].style.color = "green";
      else emailList.children[3].style.color = "";
      if (/.*[A-Z]/.test(email)) emailList.children[4].style.color = "";
      else emailList.children[4].style.color = "green";
    }
  }, [email, emailRef]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
    setMatchPassword(password === confirmPassword);
    if (passRef.current) {
      const passList = passRef.current;
      if (/(?=.*?[A-Z])/.test(password))
        passList.children[0].style.color = "green";
      else passList.children[0].style.color = "";
      if (/(?=.*?[a-z])/.test(password))
        passList.children[1].style.color = "green";
      else passList.children[1].style.color = "";
      if (/(?=.*?[0-9])/.test(password))
        passList.children[2].style.color = "green";
      else passList.children[2].style.color = "";
      if (/[-+_!@#$%^&*.,?]/.test(password))
        passList.children[3].style.color = "green";
      else passList.children[3].style.color = "";
      if (/^.{8,24}$/.test(password))
        passList.children[4].style.color = "green";
      else passList.children[4].style.color = "";
    }
  }, [password, confirmPassword, passRef]);

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
        setShowMessage(true);
        if (res.status === 200) {
          setMessage("Successfully Registered");
          setColor("success");
          clearForm(e);
        }
      })
      .catch((err) => {
        setShowMessage(true);
        if (!err?.response) {
          setMessage("No Server Response");
          setColor("danger");
        } else if (err?.response?.status === 409) {
          setMessage("Email Taken");
          setColor("danger");
        } else {
          setMessage("Someting went wrong, try again later");
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
      className="mx-auto mt-5 mb-5"
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
            style={{ boxShadow: "none" }}
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
            style={{ boxShadow: "none" }}
            required
          />
        </Form.Group>
      </Row>
      <Alert
        className="pb-0"
        variant="danger"
        show={firstName !== "" && lastName !== "" && !fullName}
      >
        <Alert.Heading>Invalid Name</Alert.Heading>
        <ListGroup variant="flush" className="mb-3">
          <ListGroup.Item variant="danger">
            First and last must be all letters
          </ListGroup.Item>
        </ListGroup>
      </Alert>
      <Row className="mb-3">
        <Form.Group>
          <Form.Label>User name:</Form.Label>
          <InputGroup>
            <InputGroup.Text variant="outline-light">
              <FontAwesomeIcon icon={faUser} />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Enter your User name:"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              style={{ boxShadow: "none" }}
              required
            />
          </InputGroup>
        </Form.Group>
      </Row>
      <Alert className="pb-0" variant="danger" show={user !== "" && !validName}>
        <Alert.Heading>Invalid User name</Alert.Heading>
        <ListGroup variant="flush" ref={userRef} className="mb-3">
          <ListGroup.Item variant="danger">
            First must be a letter
          </ListGroup.Item>
          <ListGroup.Item variant="danger">
            At least 4 and at most 10 characters
          </ListGroup.Item>
        </ListGroup>
      </Alert>
      <Row className="mb-3">
        <Form.Group>
          <Form.Label>Email:</Form.Label>
          <InputGroup>
            <InputGroup.Text variant="outline-light">
              <FontAwesomeIcon icon={faEnvelope} />
            </InputGroup.Text>
            <Form.Control
              type="email"
              placeholder="Enter your email:"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ boxShadow: "none" }}
              required
            />
          </InputGroup>
        </Form.Group>
      </Row>
      <Alert
        className="pb-0"
        variant="danger"
        show={email !== "" && !validEmail}
      >
        <Alert.Heading>Invalid Email Address</Alert.Heading>
        <ListGroup variant="flush" ref={emailRef} className="mb-3">
          <ListGroup.Item variant="danger">
            Username allow to have letter and number
          </ListGroup.Item>
          <ListGroup.Item variant="danger">
            Mail Server are all letter
          </ListGroup.Item>
          <ListGroup.Item variant="danger">
            Domain are all letter and either 2 or 3 character
          </ListGroup.Item>
          <ListGroup.Item variant="danger">
            Cannot have space between
          </ListGroup.Item>
          <ListGroup.Item variant="danger">All Lowercase</ListGroup.Item>
        </ListGroup>
      </Alert>
      <Row className="mb-3">
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <InputGroup>
            <InputGroup.Text variant="outline-light">
              <FontAwesomeIcon icon={showPass ? faLockOpen : faLock} />
            </InputGroup.Text>
            <Form.Control
              type={showPass ? "text" : "password"}
              placeholder="Enter your password:"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ boxShadow: "none" }}
              required
            />
            <Button
              variant="outline-secondary"
              onClick={() => setShowPass(!showPass)}
            >
              <FontAwesomeIcon icon={showPass ? faEye : faEyeSlash} />
            </Button>
          </InputGroup>
        </Form.Group>
      </Row>
      <Alert
        className="pb-0"
        variant="danger"
        show={password !== "" && !ValidPassword}
      >
        <Alert.Heading>Invalid Password</Alert.Heading>
        <ListGroup variant="flush" ref={passRef} className="mb-3">
          <ListGroup.Item variant="danger">
            At least one upper case English letter
          </ListGroup.Item>
          <ListGroup.Item variant="danger">
            At least one lower case English letter
          </ListGroup.Item>
          <ListGroup.Item variant="danger">At least one digit</ListGroup.Item>
          <ListGroup.Item variant="danger">
            At least one special character (-+_!@#$%^&*.,?)
          </ListGroup.Item>
          <ListGroup.Item variant="danger">
            Minimum of 8 and Maximum of 24 in length
          </ListGroup.Item>
        </ListGroup>
      </Alert>
      <Row className="mb-3">
        <Form.Group>
          <Form.Label>Confirmed Password:</Form.Label>
          <InputGroup>
            <InputGroup.Text variant="outline-light">
              <FontAwesomeIcon icon={showConfirmPass ? faLockOpen : faLock} />
            </InputGroup.Text>
            <Form.Control
              type={showConfirmPass ? "text" : "password"}
              placeholder="Comfired your password:"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{ boxShadow: "none" }}
              required
            />
            <Button
              variant="outline-secondary"
              onClick={() => setShowConfirmPass(!showConfirmPass)}
            >
              <FontAwesomeIcon icon={showConfirmPass ? faEye : faEyeSlash} />
            </Button>
          </InputGroup>
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
              style={{ boxShadow: "none" }}
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
              <Button variant="secondary" style={{ boxShadow: "none" }}>
                Return
              </Button>
            </ButtonGroup>
          </Link>
        </Col>
      </Row>
    </Form>
  );
};

export default SignUp;
