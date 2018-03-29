import React, { Component } from "react";
import { Form, Button, Message } from "semantic-ui-react";
import PropTypes from "prop-types";
import Validator from "validator";
import InlineError from "../messages/InlineError";

class ForgotPasswordForm extends Component {
  state = {
    data: {
      email: ""
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
    if (!Validator.isEmail(data.email)) {
      errors.email = "Enter a valid email";
    }
    return errors;
  };

  render() {
    const { data, errors, loading } = this.state;

    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
        {!!errors.global && <Message negative>{errors.global}</Message>}
        <label htmlFor="email" style={{ float: "left" }}>
          Email
        </label>
        {errors.email && <InlineError text={errors.email} />}
        <Form.Field error={!!errors.email}>
          <Form.Input
            type="email"
            name="email"
            placeholder="oi@oi.oi"
            value={data.email}
            onChange={this.onChange}
          />
        </Form.Field>
        <Button fluid primary>
          Restore password
        </Button>
      </Form>
    );
  }
}

ForgotPasswordForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default ForgotPasswordForm;
