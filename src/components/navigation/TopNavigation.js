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
      borderless
      stackable
      inverted
      size="large"
      style={{ display: "block", background: "#1e002d" }}
    >
      {!user.confirmed && <ConfirmEmailMessage />}

      <Container>
        <Menu.Item header name="menuIcon" as={Link} to="/dashboard" style={{ fontSize: "1.2em" }}>
          Mulligan
        </Menu.Item>
        {/* <Menu.Item name="home" as={Link} to="/dashboard">
          Home
        </Menu.Item> */}
        <Menu.Item name="golfrounds" as={Link} to="/my-rounds">
          Golf Rounds
        </Menu.Item>
        <Menu.Item name="friends" as={Link} to="/golfclubs">
          Golf Clubs
        </Menu.Item>
        <Menu.Item name="friends" as={Link} to="/friends">
          Find Friends
        </Menu.Item>

        <Menu.Menu position="right" >
          <Dropdown
            item
            trigger={
              <div>
                <span style={{ marginRight: "10px" }}>{user.username}</span>
                <Image
                  avatar
                  src={gravatarUrl(user.email, { default: "identicon" })}
                />
              </div>
            }
          >
            <Dropdown.Menu >
              <Dropdown.Item as={Link} to="/settings" >
                Account
              </Dropdown.Item>
              <Dropdown.Item onClick={() => logout()}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
        <Menu.Item>
          <div style={{ display: "flex" }}>
            <div> Hcp: </div>
            <div style={{ color: "#fbbd08", fontSize: "1.1em", lineHeight: "0.9em", marginLeft: "2px" }}>{user.hcp.value}</div>
          </div>
        </Menu.Item>
      </Container>
    </Menu>
    {!user.confirmed && <div style={{ height: "58px" }} />}
  </div>
);

TopNavigation.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired
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
