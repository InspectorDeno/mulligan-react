import React from "react";
import PropTypes from "prop-types";
import { Container, Header, Button, Segment } from "semantic-ui-react";

const HomePageHeader = ({ mobile }) => (
  <Container text>
    <Header
      content="Mulligan"
      inverted
      style={{
        fontSize: mobile ? "2em" : "4em",
        fontWeight: "normal",
        marginTop: mobile ? "1.5em" : "2em"
      }}
    />
    <Button inverted color="orange" size="huge">
      Join today
    </Button>
  </Container>
);

HomePageHeader.propTypes = {
  mobile: PropTypes.bool.isRequired
};

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
