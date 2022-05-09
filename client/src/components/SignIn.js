import Axios from "axios";
import { Form, Button, ButtonGroup, Row, Col, Alert } from "react-bootstrap";
import { useState } from "react";
import { View, Text } from "react-native";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const SignIn = () => {
  const { auth, setAuth } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [color, setColor] = useState("");
  const navigate = useNavigate();

  const logIn = (e) => {
    e.preventDefault();

    Axios.post("http://localhost:3001/signIn", {
      email: email,
      password: password,
    })
      .then((res) => {
        console.log(res.data);
        // console.log(res.data.status === 409);
        setShowMessage(true);
        if (res.data.status === 409) {
          setMessage("Either Email, password or both are wrong");
          setColor("danger");
        } else if (res.data.status === 200) {
          setMessage("Successfully Logined");
          setColor("success");
          clearForm(e);
          const roles = res?.data?.roles;
          setAuth({ email, password, roles });
          console.log(auth?.roles);
          if (roles?.includes("manager")) {
            navigate("/Interface");
          } else if (roles?.includes("programmer")) {
            navigate("/UserForm");
          } else if (roles?.includes("user")) {
            navigate("/UserForm");
          }else{
            navigate("/Unauthorized");
          }
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
    setEmail("");
    setPassword("");
  };

  return (
    <Form className="mx-auto mt-5" style={{ width: "680px" }}>
      <h1 className="text-center mb-4">Sign In Form</h1>
      <Alert
        className="pb-0"
        variant={color}
        show={message !== "" && showMessage}
      >
        <Alert.Heading>SignIn Message</Alert.Heading>
        <p>{message}</p>
      </Alert>
      <Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
      </Row>
      <Row>
        <Col>
          <ButtonGroup className="d-flex">
            <Button
              variant="primary"
              type="submit"
              disabled={email === "" || password === ""}
              onClick={logIn}
            >
              Submit
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
      <Row className="m-3">
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ flex: 1, height: 2, backgroundColor: "black" }} />
          <View>
            <Text style={{ width: 50, textAlign: "center" }}>OR</Text>
          </View>
          <View style={{ flex: 1, height: 2, backgroundColor: "black" }} />
        </View>
      </Row>
      <Row>
        <Form.Group as={Col} style={{ textAlign: "center" }}>
          <p>
            Does not have an account yet?<br></br>
            Sign up now.
          </p>
        </Form.Group>
        <Col>
          <Link to="/SignUp" style={{ textDecoration: "none", color: "white" }}>
            <ButtonGroup className="d-flex">
              <Button variant="success">SignUp</Button>
            </ButtonGroup>
          </Link>
        </Col>
      </Row>
    </Form>
  );
};

export default SignIn;
