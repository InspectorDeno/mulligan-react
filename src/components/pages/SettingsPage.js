import React, { Component } from "react";
import { Divider, Container, Header, Segment } from "semantic-ui-react";
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
          Account
     </Header>
      </Segment>
    </div>
  );

  render() {
    return (
      <div>
        <this.PageHeader />
        <Container>
          <Segment.Group raised horizontal style={{ background: "#f3f4f5" }}>
            <Segment>
              <Header> Change Handicap </Header>
              <Divider />
              <ChangeHcpForm submit={this.submitHcp} />
            </Segment>
            <Segment>
              <Header> Change Password </Header>
              <Divider />
              <ResetPasswordForm submit={this.submitPw} />
            </Segment>
          </Segment.Group>
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
