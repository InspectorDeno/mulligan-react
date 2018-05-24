import React, { Component } from "react";
import PropTypes from "prop-types";
import { Header, Form, Button } from "semantic-ui-react";

class ChangeHcpForm extends Component {
  state = {
    data: {},
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
      errors.hcpInput = "Not a valid HCP";
    }
    return errors;
  };

  render() {
    const { errors, data } = this.state;
    return (
      <div>
        {errors && errors.hcpInput}
        <Form onSubmit={this.onSubmit}>
          <Header>Change handicap </Header>
          <label htmlFor="hcp" text="Enter hcp" style={{ float: "left" }} />
          <Form.Input
            fluid
            name="hcpInput"
            value={data.hcp}
            icon="user"
            iconPosition="right"
            placeholder="New hcp"
            onChange={this.onChange}
          />
          <Button> Change hcp </Button>
        </Form>
      </div>
    );
  }
}

ChangeHcpForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default ChangeHcpForm;
