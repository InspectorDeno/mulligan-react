import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Button, Message, Icon } from "semantic-ui-react";
import PropTypes from "prop-types";
import InlineError from "../messages/InlineError";

class ForgotPasswordForm extends Component {
  state = {
    data: {
      token: this.props.token,
      password: "",
      confirmPassword: ""
    },
    message: "",
    errors: {}
  };

  //   Universal onChange event handler for text fields (y)
  onChange = e =>
    this.setState({
      ...this.state,
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onSubmit = e => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      // Validation errors from the server will be written to the component's state. Display with message
      this.props
        .submit(this.state.data)
        .catch(err => this.setState({ errors: err.response.data.errors }));
      this.setState({
        data: { password: "", confirmPassword: "" },
        message: "Success!"
      });
    }
  };

  validate = data => {
    const errors = {};
    if (!data.password) {
      errors.password = "Can't be blank";
    }
    if (data.password !== data.confirmPassword) {
      errors.password = "Passwords must match";
      errors.confirmPassword = "Passwords must match";
    }
    if (data.password.length < 6) {
      errors.password = "Password must be at least six (6) characters";
    }
    return errors;
  };

  render() {
    const { data, errors, message } = this.state;
    const { loading } = this.props;

    return (
      <div>
        <Form l oading={loading}>
          {!!errors.global && <Message negative>{errors.global}</Message>}
          <Form.Field error={!!errors.password}>
            <label htmlFor="password" style={{ float: "left" }}>
              New Password
            </label>
            {errors.password && <InlineError text={errors.password} />}
            <Form.Input
              type="password"
              name="password"
              id="password"
              icon="lock"
              iconPosition="left"
              placeholder="Your New Password"
              value={data.password}
              onChange={this.onChange}
            />
          </Form.Field>
          <Form.Field error={!!errors.confirmPassword}>
            <label htmlFor="confirmPassword" style={{ float: "left" }}>
              Repeat New Password
            </label>
            {errors.confirmPassword && (
              <InlineError text={errors.confirmPassword} />
            )}
            <Form.Input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              icon="lock"
              iconPosition="left"
              placeholder="Repeat New Password"
              value={data.confirmPassword}
              onChange={this.onChange}
            />
          </Form.Field>
        </Form>
        <div style={{ marginTop: "1em" }}>
          {message ? (
            <Message positive fluid>
              <div style={{ display: "flex" }}>
                <Icon name="checkmark" />
                {message}
              </div>
            </Message>
          ) : (
              <Button onClick={this.onSubmit} color="yellow">
                Change Password
            </Button>
            )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.user.loading,
    message: state.user.message
  };
}

ForgotPasswordForm.propTypes = {
  submit: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired
};

export default connect(mapStateToProps)(ForgotPasswordForm);
