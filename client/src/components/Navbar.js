import React from "react";
import { Card, Button, ButtonGroup, Row, Col } from "react-bootstrap";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

const Navbar = () => {
  const { auth, setAuth } = useContext(AuthContext);

  const logout = async () => {
    setAuth({});
  };

  return (
    <>
      <Card className="mt-3 mb-3">
        <Row className="m-3">
          <Col>
            <h2>Welcome, {auth.roles}</h2>
          </Col>
          <Col>
            <Link
              to="/SignIn"
              style={{ textDecoration: "none", color: "white" }}
            >
              <ButtonGroup style={{ width: "100%" }}>
                <Button variant="success" onClick={logout}>
                  Sign Out
                </Button>
              </ButtonGroup>
            </Link>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default Navbar;
