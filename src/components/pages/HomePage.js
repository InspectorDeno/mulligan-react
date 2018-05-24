import React from "react";
import { connect } from "react-redux";
import { Container, Header, Button, Segment } from "semantic-ui-react";

const HomePageHeader = () => (
  <Container text>
    <Header
      content="Mulligan"
      inverted
      style={{
        fontSize: "4em",
        fontWeight: "normal",
        marginTop: "2em"
      }}
    />
    <Button inverted color="orange" size="huge">
      Join today
    </Button>
  </Container>
);

const DesktopContainer = () => (
  <Segment
    textAlign="center"
    vertical
    style={{ minHeight: 400, padding: "1em 0em", background: "#1e002d" }}
  >
    <HomePageHeader />
  </Segment>
);

const HomePage = () => <DesktopContainer />;

export default HomePage;
