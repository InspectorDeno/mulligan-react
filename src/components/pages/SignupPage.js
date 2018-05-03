import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Segment, Grid, Header, Divider } from "semantic-ui-react";
import SignupForm from "../forms/SignupForm";
import { signup } from "../../actions/users";

class SignupPage extends Component {
  submit = data =>
    this.props.signup(data).then(() => this.props.history.push("/dashboard"));

  render() {
    return (
      // TODO: Hey let's make a css for this shite
      <Grid columns={2} relaxed style={{ height: "100vh" }}>
        <Grid.Column style={{ background: "#3d3d3d" }} />
        <Grid.Column style={{ verticalAlign: "middle", background: "#1b1c1d" }}>
          <Segment raised style={{ maxWidth: "450px", margin: "auto" }}>
            <Header as="h2" textAlign="center" color="orange">
              Sign Up
            </Header>
            <Divider />
            <SignupForm submit={this.submit} />
          </Segment>
        </Grid.Column>
      </Grid>
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
