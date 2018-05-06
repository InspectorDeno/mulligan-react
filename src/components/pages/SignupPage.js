import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Segment, Header, Divider } from "semantic-ui-react";
import SignupForm from "../forms/SignupForm";
import { signup } from "../../actions/users";

class SignupPage extends Component {
  submit = data =>
    this.props.signup(data).then(() => this.props.history.push("/dashboard"));

  render() {
    return (
      <div style={{ maxWidth: "500px", margin: "auto" }}>
        <Segment raised>
          <Header as="h2" textAlign="center" color="orange">
            Sign Up
          </Header>
          <Divider />
          <SignupForm submit={this.submit} />
        </Segment>
      </div>
    );
  }
}

SignupPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  signup: PropTypes.func.isRequired
};

export default connect(null, { signup })(SignupPage);
