import React, { Component } from "react";
import PropTypes from "prop-types";
import { Message, Grid, Header, Divider, Segment } from "semantic-ui-react";
import { connect } from "react-redux";
import ForgotPasswordForm from "../forms/ForgotPasswordForm";
import { resetPasswordRequest } from "../../actions/auth";

class ForgotPasswordPage extends Component {
  state = {
    success: false
  };

  submit = data =>
    this.props
      .resetPasswordRequest(data)
      .then(() => this.setState({ success: true }));

  render() {
    // Display this form if this is false, a message if it's true
    return (
      <div>
        {this.state.success ? (
          <Message>
            An email was sent to your email address with a link to reset your
            password.
          </Message>
        ) : (
          <Grid columns={2} relaxed middle aligned style={{ height: "100vh" }}>
            <Grid.Column style={{ background: "#3d3d3d" }} />
            <Grid.Column
              style={{ verticalAlign: "middle", background: "#1b1c1d" }}
            >
              <Segment raised style={{ maxWidth: "450px" }}>
                <Header as="h2" textAlign="center" color="orange">
                  Restore password
                </Header>
                <Divider />
                <Message>
                  <li>Fill in your email address below</li>
                  <li>You will get an email with a temporary code</li>
                  <li>Follow the link in the email to restore your password</li>
                </Message>
                <ForgotPasswordForm submit={this.submit} />
              </Segment>
            </Grid.Column>
          </Grid>
        )}
      </div>
    );
  }
}

ForgotPasswordPage.propTypes = {
  resetPasswordRequest: PropTypes.func.isRequired
};

export default connect(null, { resetPasswordRequest })(ForgotPasswordPage);
