import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";

import TopNavigation from "./components/navigation/TopNavigation";
import DefaultMenu from "./components/navigation/DefaultMenu";
import Footer from "./components/navigation/Footer"

import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import SignupPage from "./components/pages/SignupPage";
import ConfirmationPage from "./components/pages/ConfirmationPage";
import ForgotPasswordPage from "./components/pages/ForgotPasswordPage";
import ResetPasswordPage from "./components/pages/ResetPasswordPage";
import DashboardPage from "./components/pages/DashboardPage";
import GolfRoundsPage from "./components/pages/GolfRoundsPage";
import GolfClubsPage from "./components/pages/GolfClubsPage";
import SettingsPage from "./components/pages/SettingsPage";
import FriendsPage from "./components/pages/FriendsPage";
import ErrorPage from "./components/pages/ErrorPage";

import GuestRoute from "./components/routes/GuestRoute";
import UserRoute from "./components/routes/UserRoute";

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { location, isAuthenticated } = this.props;
    return (
      <div>
        <div style={{ minHeight: "56em" }}>
          {isAuthenticated ? <TopNavigation /> : <DefaultMenu />}
          <Switch>
            <Route location={location} path="/" exact component={HomePage} />
            <Route
              location={location}
              exact
              path="/confirmation/:token"
              component={ConfirmationPage}
            />
            <GuestRoute
              location={location}
              exact
              path="/login"
              component={LoginPage}
            />
            <GuestRoute
              location={location}
              exact
              path="/signup"
              component={SignupPage}
            />
            <GuestRoute
              location={location}
              exact
              path="/forgot_password"
              component={ForgotPasswordPage}
            />
            <GuestRoute
              location={location}
              exact
              path="/reset_password/:token"
              component={ResetPasswordPage}
            />
            <UserRoute
              location={location}
              exact
              path="/dashboard"
              component={DashboardPage}
            />
            <UserRoute
              location={location}
              exact
              path="/settings"
              component={SettingsPage}
            />
            <UserRoute
              location={location}
              exact
              path="/my-rounds"
              component={GolfRoundsPage}
            />
            <UserRoute
              location={location}
              exact
              path="/friends"
              component={FriendsPage}
            />
            <UserRoute
              location={location}
              exact
              path="/golfclubs"
              component={GolfClubsPage}
            />
            <Route
              component={ErrorPage}
            />
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

App.propTypes = {};

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
