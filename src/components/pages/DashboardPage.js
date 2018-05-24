import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Header, Container, Image, Segment } from "semantic-ui-react";
import GetWeather from "../GetWeather";
import CompleteSignupModal from "../modals/CompleteSignupModal";

class DashboardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  PageHeader = () => (
    <Segment
      vertical
      textAlign="center"
      style={{
        minHeight: 200,
        padding: "1em 0em ",
        background:
          "linear-gradient(154deg, #1e002d, #1e002d,#1e002d, #b5cc18)",
        border: "none",
        marginBottom: "4em"
      }}
    >
      <Header
        inverted
        style={{
          fontSize: "4em",
          fontWeight: "normal",
          marginTop: "1em"
        }}
      >
        <Header.Content>
          Mulligan
          <Header.Subheader>Home</Header.Subheader>
        </Header.Content>
      </Header>
    </Segment>
  );
  render() {
    const { user } = this.props;
    return (
      <div>
        <this.PageHeader />
        <Container>
          {/* <Image as="img" src="/src/assets/images/titleist.png" /> */}
          <GetWeather />
          {!user.hcp.sethcp && !user.shownModal && <CompleteSignupModal />}
        </Container>
      </div>
    );
  }
}

DashboardPage.propTypes = {
  // isConfirmed: PropTypes.bool.isRequired
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    hcp: PropTypes.shape({
      value: PropTypes.number.isRequired,
      sethcp: PropTypes.bool.isRequired
    }).isRequired,
    shownModal: PropTypes.bool
  }).isRequired
};

DashboardPage.defaultProps = {
  shownModal: false
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(DashboardPage);
