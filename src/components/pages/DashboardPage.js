import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Segment, Divider } from "semantic-ui-react";
import ConfirmEmailMessage from "../messages/ConfirmEmailMessage";
import GetWeather from "../GetWeather";

const DashboardPage = props => (
  <div>
    <div>{!props.isConfirmed && <ConfirmEmailMessage />}</div>
    <Segment>
      <h1>Nearby Golf clubs</h1>
      <Divider />
      <div>Dash Smash</div>
      <GetWeather />
    </Segment>
  </div>
);

function mapStateToProps(state) {
  return {
    isConfirmed: !!state.user.confirmed
  };
}

DashboardPage.propTypes = {
  isConfirmed: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, {})(DashboardPage);
