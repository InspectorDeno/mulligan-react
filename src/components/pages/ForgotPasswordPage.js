import React, { Component } from "react";
import PropTypes from "prop-types";
import { Message, Container, Header, Divider, Segment } from "semantic-ui-react";
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

  PageHeader = () => (
    <div>
      <Segment
        vertical
        textAlign="center"
        style={{
          minHeight: 250,
          padding: "1em 0em ",
          background:
            "linear-gradient(154deg, #1e002d, #1e002d, darkslategray)",
          border: "none",
          boxShadow: "0 0 11px 0"
        }}
      />
      <Segment compact style={{
        marginTop: "-60px",
        border: "none",
        textAlign: "center",
        background: "rgb(255,255,255)",
        marginLeft: "50px",
        boxShadow: "none",
        borderRadius: "20px"
      }}>
        <Header style={{
          fontSize: "4em",
          fontWeight: "normal",
          padding: "20px",
          fontFamily: "Ananda",
          color: "#1e002d"
        }}>
          Restore Password
         </Header>
      </Segment>
    </div>
  );

  render() {
    // Display this form if this is false, a message if it's true
    return (
      <div>
        <this.PageHeader />
        {this.state.success ? (
          <Message>
            An email was sent to your email address with a link to reset your
            password.
          </Message>
        ) : (
            <Container>
              <Segment raised compact style={{ margin: "auto" }}>
                <Header as="h2" textAlign="center" color="orange">
                  Restore Password
                </Header>
                <Divider />
                <Message>
                  <li>Fill in your email address below</li>
                  <li>You will get an email with a temporary code</li>
                  <li>Follow the link in the email to restore your password</li>
                </Message>
                <ForgotPasswordForm submit={this.submit} />
              </Segment>
            </Container>
          )}
      </div>
    );
  }
}

ForgotPasswordPage.propTypes = {
  resetPasswordRequest: PropTypes.func.isRequired
};

export default connect(null, { resetPasswordRequest })(ForgotPasswordPage);
