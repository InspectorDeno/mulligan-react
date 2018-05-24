import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Image } from "semantic-ui-react";
import GetWeather from "../GetWeather";
import CompleteSignupModal from "../modals/CompleteSignupModal"


class DashboardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { user } = this.props;
    return (
      <div>
        {/* <Image as="img" src="/src/assets/images/titleist.png" /> */}
        <GetWeather />
        {!user.hcp.sethcp && !user.shownModal && <CompleteSignupModal />}
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
      sethcp: PropTypes.bool.isRequired,
    }).isRequired,
    shownModal: PropTypes.bool,
  }).isRequired,
};

DashboardPage.defaultProps = {
  shownModal: false
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(DashboardPage);
