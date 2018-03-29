import React from "react";
import { Menu, Dropdown, Image, Container } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import gravatarUrl from "gravatar-url";
import PropTypes from "prop-types";
import * as actions from "../../actions/auth";

// Should just be visibile for authenticated users

const TopNavigation = ({ user, logout }) => (
  <Menu fixed="top" inverted pointing size="large">
    <Container>
      <Menu.Item header name="Home" as={Link} to="/dashboard">
        Mulligan
      </Menu.Item>
      <Menu.Item name="Golfkarta" as={Link} to="/dashboard">
        Golfkarta
      </Menu.Item>
      <Menu.Item name="Spela golf" as={Link} to="/dashboard">
        Spela golf
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
