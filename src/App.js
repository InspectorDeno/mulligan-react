import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import io from "socket.io-client";

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
import GolfClubsPage from "./components/pages/GolfClubsPage";

import GuestRoute from "./components/routes/GuestRoute";
import UserRoute from "./components/routes/UserRoute";
import FriendsPage from "./components/pages/FriendsPage";

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  // componentDidMount() {
  //   const socket = io({ query: "nick=denduru" });
  //   console.log("Mounting App");
  //   socket.on("FromAPI", data => console.log(data));
  // }
  render() {
    const { location, isAuthenticated } = this.props;
    return (
      <div>
        {isAuthenticated ? <TopNavigation /> : <DefaultMenu />}
        <Route location={location} path="/" exact component={HomePage} />
        <div style={{ height: "81px" }} />
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
        <div className="ui container" style={{ height: "100%" }}>
          <UserRoute
            location={location}
            path="/dashboard"
            exact
            component={DashboardPage}
          />
          <UserRoute
            location={location}
            path="/settings"
            exact
            component={DashboardPage}
          />
          <UserRoute
            location={location}
            path="/my-rounds"
            exact
            component={GolfRoundsPage}
          />
          <UserRoute
            location={location}
            path="/friends"
            exact
            component={FriendsPage}
          />
          <UserRoute
            location={location}
            path="/golfclubs"
            exact
            component={GolfClubsPage}
          />
        </div>
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
