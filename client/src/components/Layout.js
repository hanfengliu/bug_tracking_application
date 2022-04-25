import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";

const Layout = () => {
  return (
    <Container className="mx-auto" fluid="md">
      <Outlet />
    </Container>
  );
};

export default Layout;
