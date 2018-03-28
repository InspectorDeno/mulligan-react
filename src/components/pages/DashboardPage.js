import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Menu, MenuItem, Card } from "semantic-ui-react";
import ConfirmEmailMessage from "../messages/ConfirmEmailMessage";
import * as actions from "../../actions/auth";

const DashboardPage = ({ isConfirmed, logout }) => (
  <div>
    <Menu size="small">
      <MenuItem position="right" onClick={() => logout()}>
        Logout
      </MenuItem>
    </Menu>
    <div>{!isConfirmed && <ConfirmEmailMessage />}</div>
    <div className="ui container">
      <Card className="right floated"> Hehe </Card>
    </div>
  </div>
);

function mapStateToProps(state) {
  return {
    isConfirmed: !!state.user.confirmed
  };
}

DashboardPage.propTypes = {
  isConfirmed: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { logout: actions.logout })(
  DashboardPage
);
