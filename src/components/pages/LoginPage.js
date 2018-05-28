import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Grid, Message, Header, Segment, Divider, Container } from "semantic-ui-react";
import LoginForm from "../forms/LoginForm";
import { login } from "../../actions/auth";

class LoginPage extends Component {
  // History is provided by router, and login is available to us when we connect this component to redux
  submit = data =>
    this.props.login(data).then(() => this.props.history.push("/dashboard"));

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
          Log In
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
            <Grid
              textAlign="center"
              style={{ height: "100%", width: "300px", maxWidth: "450px" }}
            >
              <Grid.Column
                style={{
                  background: "white"
                }}
              >
                <Header as="h2" color="orange">
                  Login
              </Header>
                <Divider />
                <LoginForm submit={this.submit} />
                <Message fluid="true" size="tiny">
                  Forgot your password?
                <Link to="/forgot_password"> Restore it</Link>
                </Message>
              </Grid.Column>
            </Grid>
          </Segment>
        </Container>
      </div>
    );
  }
}

LoginPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  login: PropTypes.func.isRequired
};

export default connect(null, { login })(LoginPage);
