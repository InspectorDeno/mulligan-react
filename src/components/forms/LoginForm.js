import React, { Component } from "react";
import { Form, Button, Message } from "semantic-ui-react";
import PropTypes from "prop-types";
import Validator from "validator";
import InlineError from "../messages/InlineError";

class LoginForm extends Component {
  state = {
    data: {
      username_email: "",
      password: ""
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

  onSubmit = () => {
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

  // Client side validation of password. Add more here if we want
  // Validator behövs inte??
  validate = data => {
    const errors = {};
    if (!data.username_email) {
      errors.username_email = "Enter a valid email";
    }
    if (!data.password) {
      errors.password = "Please enter a password";
    }
    return errors;
  };

  render() {
    const { data, errors, loading } = this.state;

    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
        {errors.global && (
          <Message negative>
            <Message.Header>Failed to log in</Message.Header>
            <p>{errors.global}</p>
          </Message>
        )}

        <label htmlFor="username_email" style={{ float: "left" }}>
          Username or Email
        </label>
        {errors.email && <InlineError text={errors.email} />}
        <Form.Field error={!!errors.email}>
          <Form.Input
            fluid
            type="text"
            name="username_email"
            icon="user"
            iconPosition="left"
            placeholder="Username or Email"
            value={data.username_email}
            onChange={this.onChange}
          />
        </Form.Field>

        <label htmlFor="password" style={{ float: "left" }}>
          Password
        </label>
        {errors.password && <InlineError text={errors.password} />}
        <Form.Field error={!!errors.password}>
          <Form.Input
            fluid
            type="password"
            name="password"
            icon="lock"
            iconPosition="left"
            placeholder="Password"
            value={data.password}
            onChange={this.onChange}
          />
        </Form.Field>
        <Button color="orange" fluid>
          Login
        </Button>
      </Form>
    );
  }
}

LoginForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default LoginForm;
