import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

// Should just be visibile for authenticated users

const DefaultMenu = () => (
  <Menu
    fluid
    borderless
    fixed="top"
    inverted
    size="large"
    style={{ background: "#1e002d" }}
  >
    <Container style={{ margin: 10 }}>
      <Menu.Item header name="Home" as={Link} to="/dashboard" style={{ fontSize: "1.2em" }}>
        Mulligan
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item>
          <Button.Group>
            <Button inverted color="orange" as={Link} to="/login">
              Log in
          </Button>
            <Button
              as={Link}
              to="/signup"
              color="orange"
              style={{ marginLeft: "0.5em" }}
            >
              Sign up
          </Button>
          </Button.Group>
        </Menu.Item>
      </Menu.Menu>
    </Container>
  </Menu>
);

export default DefaultMenu;
