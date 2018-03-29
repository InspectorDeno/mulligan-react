import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Button, Message } from "semantic-ui-react";
import Validator from "validator";
import InlineError from "../messages/InlineError";

class SignupForm extends Component {
  state = {
    data: {
      email: "",
      password: ""
    },
    options: [
      { key: "m", text: "Male", value: "male" },
      { key: "f", text: "Female", value: "female" }
    ],
    loading: false,
    errors: {}
  };

  onChange = e =>
    this.setState({
      data: {
        ...this.state.data,
        [e.target.name]: e.target.value
      }
    });

  onSubmit = e => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({
      errors
    });
    if (Object.keys(errors).length === 0) {
      this.setState({
        loading: true
      });
      this.props.submit(this.state.data).catch(err =>
        this.setState({
          errors: err.response.data.errors,
          loading: false
        })
      );
    }
  };

  validate = data => {
    const errors = {};
    if (!Validator.isEmail(data.email)) {
      errors.email = "Invalid email";
    }
    if (!data.password) {
      errors.password = "Can't be blank";
    }
    return errors;
  };

  render() {
    const { data, errors, loading, options } = this.state;
    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
        {errors.global && (
          <Message negative>
            <Message.Header>Failed to sign up</Message.Header>
            <p>{errors.global}</p>
          </Message>
        )}

        <label htmlFor="email" style={{ float: "left" }}>
          Email
        </label>
        {errors.email && <InlineError text={errors.email} />}
        <Form.Field error={!!errors.email}>
          <Form.Input
            fluid
            type="email"
            name="email"
            icon="user"
            iconPosition="left"
            placeholder="oi@oi.oi"
            value={data.email}
            onChange={this.onChange}
          />
        </Form.Field>

        <label htmlFor="password" style={{ float: "left" }}>
          Password
        </label>
        {errors.password && <InlineError text={errors.password} />}
        <Form.Field error={!!errors.password}>
          <Form.Input
            type="password"
            name="password"
            icon="lock"
            iconPosition="left"
            placeholder="123123"
            value={data.password}
            onChange={this.onChange}
          />
        </Form.Field>

        <Form.Group widths="equal">
          <Form.Select
            fluid
            name="gender"
            label="Gender"
            options={options}
            placeholder="Gender"
          />
          <Form.Input
            fluid
            type="double"
            name="hcp"
            label="hcp"
            icon="write"
            iconPosition="left"
          />
        </Form.Group>
        <Button fluid color="black">
          Sign up
        </Button>
      </Form>
    );
  }
}

SignupForm.propTypes = {
  submit: PropTypes.func.isRequired
};
export default SignupForm;
