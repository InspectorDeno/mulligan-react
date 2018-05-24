import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
)


const DesktopContainer = () => (
  <Segment
    textAlign="center"
    vertical
    style={{ minHeight: 400, padding: "1em 0em", background: "#1e002d" }}
  >
    <HomePageHeader />
  </Segment>
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

HomePage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.email
  }
}


export default connect(mapStateToProps)(HomePage);
