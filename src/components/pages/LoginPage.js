import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Grid, Message, Header, Segment, Divider } from "semantic-ui-react";
import LoginForm from "../forms/LoginForm";
import { login } from "../../actions/auth";

export class LoginPage extends Component {
  // History is provided by router, and login is available to us when we connect this component to redux
  submit = data =>
    this.props.login(data).then(() => this.props.history.push("/dashboard"));

  render() {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
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
