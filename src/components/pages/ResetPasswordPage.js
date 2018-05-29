import React, { Component } from "react";
import { Message, Segment, Header, Container } from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ResetPasswordForm from "../forms/ResetPasswordForm";
import { validateToken, resetPassword } from "../../actions/auth";



class ResetPasswordPage extends Component {
  state = {
    loading: true,
    success: false
  };

  componentDidMount() {
    this.props
      .validateToken(this.props.match.params.token)
      .then(() => this.setState({ loading: false, success: true }))
      .catch(() => this.setState({ loading: false, success: false }));
  }

  submit = data =>
    this.props
      .resetPassword(data)
      .then(() => this.props.history.push("/login"));

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
          Reset Password
           </Header>
      </Segment>
    </div>
  );



  render() {
    const { loading, success } = this.state;
    const token = this.props.match.params.token;
    return (
      <div>
        <this.PageHeader />
        <Container>
          {loading && <Message>Loading</Message>}
          {!loading &&
            success && <ResetPasswordForm submit={this.submit} token={token} />}
          {!loading && !success && <Message>Invalid Token</Message>}
        </Container>
      </div>
    );
  }
}

ResetPasswordPage.propTypes = {
  validateToken: PropTypes.func.isRequired,
  resetPassword: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default connect(null, { validateToken, resetPassword })(
  ResetPasswordPage
);
