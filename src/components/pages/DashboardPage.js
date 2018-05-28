import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Header, Container, Segment } from "semantic-ui-react";
import GetWeather from "../GetWeather";
import CompleteSignupModal from "../modals/CompleteSignupModal";
import header from "../../assets/images/titleist.png";


class DashboardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  PageHeader = () => (
    <div style={{ marginBottom: "50px" }}>
      <img src={header} alt="logo" style={{ width: "100%" }} />
      {/* <div style={{ position: "relative", left: 0 }}>Hej</div> */}
      <Segment compact style={{
        marginTop: "-200px",
        border: "none",
        textAlign: "center",
        background: "rgb(255,255,255,0.7)",
        marginBottom: "180px"
      }}>
        <Header style={{
          fontSize: "4em",
          fontWeight: "normal",
          padding: "0 10px 0 50px"
        }}>
          Home
       </Header>
      </Segment>
    </div>
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
