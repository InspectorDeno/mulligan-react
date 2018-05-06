import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'; 
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
        <GetWeather />
        {!user.hcp.sethcp && !user.shownModal && <CompleteSignupModal/>}
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
     shownModal: PropTypes.bool.isRequired,
   }).isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(DashboardPage);
