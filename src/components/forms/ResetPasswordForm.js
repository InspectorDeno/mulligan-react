import React, { Component } from "react";
import { Form, Button, Message } from "semantic-ui-react";
import PropTypes from "prop-types";
import InlineError from "../messages/InlineError";

class ForgotPasswordForm extends Component {
  state = {
    data: {
      token: this.props.token,
      password: "",
      confirmPassword: ""
    },
    loading: false,
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
      this.setState({ loading: true });
      // Validation errors from the server will be written to the component's state. Display with message
      this.props
        .submit(this.state.data)
        .catch(err =>
          this.setState({ errors: err.response.data.errors, loading: false })
        );
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
    return errors;
  };

  render() {
    const { data, errors, loading } = this.state;

    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
        {!!errors.global && <Message negative>{errors.global}</Message>}
        <Form.Field error={!!errors.password}>
          <label htmlFor="password">New Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Your new password"
            value={data.password}
            onChange={this.onChange}
          />
          {errors.password && <InlineError text={errors.password} />}
        </Form.Field>
        <Form.Field error={!!errors.confirmPassword}>
          <label htmlFor="confirmPassword">Repeat New Password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Repeat new password"
            value={data.confirmPassword}
            onChange={this.onChange}
          />
          {errors.confirmPassword && (
            <InlineError text={errors.confirmPassword} />
          )}
        </Form.Field>
        <Button primary>Reset</Button>
      </Form>
    );
  }
}

ForgotPasswordForm.propTypes = {
  submit: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired
};

export default ForgotPasswordForm;
