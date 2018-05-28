import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Segment, Header, Divider, Container } from "semantic-ui-react";
import SignupForm from "../forms/SignupForm";
import { signup } from "../../actions/users";

class SignupPage extends Component {
  submit = data =>
    this.props.signup(data).then(() => this.props.history.push("/dashboard"));

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
          Sign Up
       </Header>
      </Segment>
    </div>
  );

  render() {
    return (
      <div>
        <this.PageHeader />
        <Container style={{ display: "flex", justifyContent: "center" }}>
          <Segment raised>
            <Header as="h2" textAlign="center" color="orange">
              Sign Up
          </Header>
            <Divider />
            <SignupForm submit={this.submit} />
          </Segment>
        </Container>
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
