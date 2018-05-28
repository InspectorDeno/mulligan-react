import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
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
    <Button inverted color="orange" size="huge" as={Link} to="/signup">
      Join today
    </Button>
  </Container>
);

const DesktopContainer = () => (
  <Segment
    vertical
    textAlign="center"
    style={{
      minHeight: 400,
      padding: "1em 0em ",
      background:
        "linear-gradient(154deg, #1e002d, #1e002d, darkslategray)",
      border: "none",
      boxShadow: "0 0 11px 0"
    }}
  >
    <HomePageHeader />
  </Segment >
);

class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    const { isAuthenticated } = this.props;
    if (isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    return (
      <DesktopContainer />
    )
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.email
  }
}


HomePage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
}


export default connect(mapStateToProps)(HomePage);
