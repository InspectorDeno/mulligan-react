import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Button, Message, Icon } from "semantic-ui-react";
import InlineError from "../messages/InlineError";

class ChangeHcpForm extends Component {
  state = {
    data: {},
    loading: false,
    errors: {},
    message: ""
  };

  onChange = (e, { value }) => {
    this.setState({
      data: {
        ...this.state.data,
        [e.target.name]: value
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
      this.props.submit(this.state.data);
      this.setState({
        message: "Succesfully changed your handicap"
      });
    }
  };

  validate = value => {
    const errors = {};
    if (!value.hcpInput) {
      errors.hcpInput = "Enter something";
    }
    if (isNaN(value.hcpInput)) {
      errors.hcpInput = "Must be a number";
    }
    if (value.hcpInput > 54 || value.hcpInput < -10) {
      errors.hcpInput = "Not a valid Hcp";
    }
    console.log(errors);
    return errors;
  };

  render() {
    const { errors, data, message } = this.state;
    return (
      <div>
        <Form>
          <Form.Field>
            <label htmlFor="hcpInput" style={{ float: "left" }}>
              Enter Hcp
            </label>
            {errors && <InlineError text={errors.hcpInput} />}
            <Form.Input
              fluid
              name="hcpInput"
              value={data.hcp}
              icon="wheelchair"
              iconPosition="right"
              placeholder="Enter Hcp"
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
              <Button onClick={this.onSubmit} color="orange">
                Set Hcp
            </Button>
            )}
        </div>
      </div>
    );
  }
}

ChangeHcpForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default ChangeHcpForm;
