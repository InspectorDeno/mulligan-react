import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Segment } from "semantic-ui-react";
import ConfirmEmailMessage from "../messages/ConfirmEmailMessage";

const DashboardPage = ({ isConfirmed }) => (
  <div>
    <div>{!isConfirmed && <ConfirmEmailMessage />}</div>
    <Segment>
      <div>Dash Smash</div>
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
