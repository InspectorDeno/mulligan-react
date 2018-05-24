import React, { Component } from "react";
import { Container, Header } from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ChangeHcpForm from "../forms/ChangeHcpForm";
import ResetPasswordForm from "../forms/ResetPasswordForm";
import { changePassword, setHcp } from "../../actions/users";

class SettingsPage extends Component {
  submitPw = data => this.props.changePassword(data);

  submitHcp = data => {
    console.log("data");
    console.log(data);

    this.props.setHcp(data.hcpInput);
  };

  render() {
    return (
      <div>
        <Header
          style={{
            fontSize: "4em",
            fontWeight: "normal"
          }}
        >
          Settings page
        </Header>

        <Container>
          <ChangeHcpForm submit={this.submitHcp} />
        </Container>
        <Container>
          <ResetPasswordForm submit={this.submitPw} />
        </Container>
      </div>
    );
  }
}

SettingsPage.propTypes = {
  setHcp: PropTypes.func.isRequired,
  changePassword: PropTypes.func.isRequired
};
export default connect(null, { setHcp, changePassword })(SettingsPage);
