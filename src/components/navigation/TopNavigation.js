import React from "react";
import { Menu, Dropdown, Image, Container } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import gravatarUrl from "gravatar-url";
import PropTypes from "prop-types";
import * as actions from "../../actions/auth";
import ConfirmEmailMessage from "../messages/ConfirmEmailMessage";

// Should just be visibile for authenticated users

const TopNavigation = ({ user, logout }) => (
  <div>
    <Menu
      fixed="top"
      inverted
      borderless
      size="large"
      style={{ display: "block" }}
    >
      {!user.confirmed && <ConfirmEmailMessage />}

      <Container>
        <Menu.Item header name="menuIcon" as={Link} to="/dashboard">
          Mulligan
        </Menu.Item>
        <Menu.Item name="home" as={Link} to="/dashboard">
          Home
        </Menu.Item>
        <Menu.Item name="spelagolf" as={Link} to="/dashboard">
          Spela golf
        </Menu.Item>
        <Menu.Item name="golfrounds" as={Link} to="/my-rounds">
          My golf rounds
        </Menu.Item>

        <Menu.Menu position="right">
          <Dropdown
            item
            simple
            trigger={<Image avatar src={gravatarUrl(user.email)} />}
          >
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => logout()}>Account</Dropdown.Item>
              <Dropdown.Item onClick={() => logout()}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </Container>
    </Menu>
    {!user.confirmed && <div style={{ height: "58px" }} />}
  </div>
);

TopNavigation.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired
  }).isRequired,
  logout: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, { logout: actions.logout })(
  TopNavigation
);
