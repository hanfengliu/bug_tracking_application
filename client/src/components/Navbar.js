import React from "react";
import { Card, Button, ButtonGroup, Row, Col } from "react-bootstrap";
import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

const Navbar = () => {
  const {
    auth,
    setAuth,
    setAvailableProgrammersList,
    setBugsList,
    setFilterList,
    setIsLoading,
  } = useContext(AuthContext);

  const logout = async () => {
    setAuth({});
    setIsLoading(true);
  };

  return (
    <Card className="mt-3 mb-3">
      <Row className="m-3">
        <Col className="text-center text-capitalize">
          <h2>
            Welcome, {auth.roles} {auth.userName}
          </h2>
        </Col>
        <Col className="my-auto" fluid="md">
          <Link to="/SignIn" style={{ textDecoration: "none", color: "white" }}>
            <ButtonGroup style={{ width: "100%" }}>
              <Button variant="success" onClick={logout}>
                Sign Out
              </Button>
            </ButtonGroup>
          </Link>
        </Col>
      </Row>
    </Card>
  );
};

export default Navbar;
