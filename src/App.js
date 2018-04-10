import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route } from "react-router-dom";

import TopNavigation from "./components/navigation/TopNavigation";
import DefaultMenu from "./components/navigation/DefaultMenu";

import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import SignupPage from "./components/pages/SignupPage";
import ConfirmationPage from "./components/pages/ConfirmationPage";
import ForgotPasswordPage from "./components/pages/ForgotPasswordPage";
import ResetPasswordPage from "./components/pages/ResetPasswordPage";
import DashboardPage from "./components/pages/DashboardPage";
import GolfRoundsPage from "./components/pages/GolfRoundsPage";

import GuestRoute from "./components/routes/GuestRoute";
import UserRoute from "./components/routes/UserRoute";

const App = ({ location, isAuthenticated }) => (
  <div>
    {isAuthenticated ? <TopNavigation /> : <DefaultMenu />}
    <div className="ui container" style={{ height: "100%" }}>
      <div className="ui fluid" style={{ height: "81px" }} />
      <Route location={location} path="/" exact component={HomePage} />
      <Route
        location={location}
        path="/confirmation/:token"
        exact
        component={ConfirmationPage}
      />
      <GuestRoute
        location={location}
        path="/login"
        exact
        component={LoginPage}
      />

      <GuestRoute
        location={location}
        path="/signup"
        exact
        component={SignupPage}
      />
      <GuestRoute
        location={location}
        path="/forgot_password"
        exact
        component={ForgotPasswordPage}
      />
      <GuestRoute
        location={location}
        path="/reset_password/:token"
        exact
        component={ResetPasswordPage}
      />
      <UserRoute
        location={location}
        path="/dashboard"
        exact
        component={DashboardPage}
      />
      <UserRoute
        location={location}
        path="/my-rounds"
        exact
        component={GolfRoundsPage}
      />
    </div>
  </div>
);

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.email
  };
}

export default connect(mapStateToProps)(App);
