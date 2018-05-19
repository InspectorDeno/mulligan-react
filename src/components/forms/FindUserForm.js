import React, { Component } from "react";
import { Form, Button, Message } from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import InlineError from "../messages/InlineError";
// import * as actions from "../../actions/errorAction"

class FindUserForm extends Component {
  state = {
    data: {
      username_email: ""
    },
    loading: false,
    errors: {}
  };

  onChange = e =>
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        [e.target.name]: e.target.value
      }
    });

  onSubmit = () => {
    const errors = this.validate(this.state.data);

    this.setState({
      errors
    });
    if (Object.keys(errors).length === 0) {
      this.setState({
        loading: true
      });

      this.props
        .submit(this.state.data)
        .then(() => this.setState({
          loading: false
        }));
    }
  };

  validate = data => {
    const errors = {};
    if (!data.username_email) {
      errors.username_email = "Required";
    }
    return errors;
  };

  render() {
    const { data, loading, errors } = this.state;
    const { findUserError } = this.props;

    return (
      <Form loading={loading}>
        {findUserError.find_user && (
          <Message negative>
            <Message.Header> {
              findUserError.find_user
            } </Message.Header>
          </Message>
        )
        }
        <label htmlFor="email" style={{ float: "left" }}>
          Username or Email
        </label>
        {errors.username_email && <InlineError text={errors.username_email} />}
        <Form.Field error={!!errors.username_email}>
          <Form.Input
            type="text"
            name="username_email"
            icon="user"
            iconPosition="left"
            placeholder="Username or Email"
            value={data.username_email}
            onChange={this.onChange}
            inverted />
        </Form.Field>

        <Button color="yellow" onClick={this.onSubmit}> Search for user </Button>
      </Form>
    );
  }
}
FindUserForm.propTypes = {
  submit: PropTypes.func.isRequired,
  findUserError: PropTypes.shape({}),
};
FindUserForm.defaultProps = {
  findUserError: {}
};

function mapStateToProps(state) {
  return {
    findUserError: state.user.errors
  };
}

export default connect(mapStateToProps)(FindUserForm);