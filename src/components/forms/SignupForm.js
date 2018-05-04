import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Dropdown, Button, Message } from "semantic-ui-react";
import Validator from "validator";
import InlineError from "../messages/InlineError";

class SignupForm extends Component {
  state = {
    data: {
      email: "",
      username: "",
      password: "",
      gender: ""
    },
    options: [
      { key: "m", text: "Male", value: "male" },
      { key: "f", text: "Female", value: "female" }
    ],
    loading: false,
    errors: {}
  };

  onChange = (e, { value }) => {
    this.setState({
      data: {
        ...this.state.data,
        [e.target.name]: value
      }
    });
    // console.log(e);
    // console.log(value);
  };
  onSelectChange = (e, d) => {
    this.setState({
      data: {
        ...this.state.data,
        [d.name]: d.value
      }
    });
  };

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
    if (!data.username) {
      errors.username = "Can't be blank";
    }
    if (!data.password) {
      errors.password = "Can't be blank";
    }
    if (!data.gender) {
      errors.gender = "Can't be blank";
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

        <Form.Group widths="equal">
          <Form.Field error={!!errors.email}>
            <label htmlFor="email" style={{ float: "left" }}>
              Email
            </label>
            {errors.email && <InlineError text={errors.email} />}
            <Form.Input
              name="email"
              type="email"
              icon="user"
              iconPosition="left"
              placeholder="email@email.com"
              value={data.email}
              onChange={this.onChange}
            />
          </Form.Field>
          <Form.Field error={!!errors.username}>
            <label htmlFor="username" style={{ float: "left" }}>
              Username
            </label>
            {errors.username && <InlineError text={errors.username} />}
            <Form.Input
              name="username"
              type="text"
              icon="user"
              iconPosition="left"
              placeholder="GreatGolfeR"
              value={data.username}
              onChange={this.onChange}
            />
          </Form.Field>
        </Form.Group>

        <Form.Group widths="equal">
          <Form.Field error={!!errors.password}>
            <label htmlFor="password" style={{ float: "left" }}>
              Password
            </label>
            {errors.password && <InlineError text={errors.password} />}
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
          <Form.Field error={!!errors.gender}>
            <label htmlFor="gender" style={{ float: "left" }}>
              Gender
            </label>
            {errors.gender && <InlineError text={errors.gender} />}
            <Dropdown
              selection
              name="gender"
              placeholder="Gender"
              options={options}
              value={data.gender}
              onChange={this.onSelectChange}
            />
          </Form.Field>
        </Form.Group>
        <Button fluid color="orange">
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
