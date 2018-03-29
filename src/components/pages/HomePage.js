import React from "react";
import { Grid } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as actions from "../../actions/auth";

const HomePage = ({ isAutenticated, logout }) => (
  <div className="middle aligned center aligned grid">
    <Grid.Column>
      <h1>Home Page</h1>
      {isAutenticated ? (
        <button onClick={() => logout()}>Logout</button>
      ) : (
        <div>
          <Link to="/login">Login</Link> or <Link to="/signup">Sign up</Link>
        </div>
      )}
    </Grid.Column>
  </div>
);

HomePage.propTypes = {
  isAutenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    isAutenticated: !!state.user.token
  };
}

export default connect(mapStateToProps, { logout: actions.logout })(HomePage);
