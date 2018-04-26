import React, { Component } from "react";
import { Form, Button, Message } from "semantic-ui-react";
import PropTypes from "prop-types";
import Validator from "validator";
import InlineError from "../messages/InlineError";

class FindUserForm extends Component {
    state = {
        data: {
            email: ""
        },
        loading: false,
        errors: {}

    };

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

    validate = data => {
        const errors = {};
        if (!Validator.isEmail(data.email)) {
          errors.email = "Enter a valid email";
        }
        return errors;
      };

    render() {
        const {data, errors, loading} = this.state;
            return (
                <Form onSubmit={this.onSubmit} loading={loading}>
                    {errors.global && (
                        <Message negative>
                            <Message.Header>Failed to log in</Message.Header>
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
                    <Button color="orange" fluid>
                        Search for user
                    </Button>
                </Form>
            )   
    } 
}
FindUserForm.propTypes = {
    submit: PropTypes.func.isRequired
  };
  
  export default FindUserForm;
  