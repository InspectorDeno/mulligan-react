import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import Datetime from "react-datetime";
import { Button, Divider, Form, Message, Header } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";

class StepTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: ""
    };
  }

  validate = enteredDate => {
    if (!moment(enteredDate).isValid()) {
      return "Wrong date format";
    }
    return undefined;
  };

  DateTimePicker = ({ input: { onChange, value, name }, meta }) => (
    <div>
      {meta.error && <Message error>{meta.error}</Message>}
      <Datetime
        name={name}
        dateFormat="ddd D/M"
        timeFormat="HH:mm"
        defaultValue={!value && new Date(Date.now()).setMinutes(0)}
        value={value}
        timeConstraints={{ minutes: { step: 5 } }}
        onChange={param => {
          onChange(param);
        }}
      />
      {/* <span>{JSON.stringify(meta, 0, 2)}</span> */}
    </div>
  );
  render() {
    const { handleSubmit, previousPage, invalid, submitting } = this.props;

    return (
      <div>
        <Header>Enter a date</Header>
        <Form error>
          <Field
            name="selectedDate"
            component={this.DateTimePicker}
            validate={[this.validate]}
          />
          <div>
            <Divider />
            <Button onClick={previousPage}>Previous</Button>
            <Button onClick={handleSubmit} disabled={invalid || submitting}>
              Next
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

StepTwo.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired
};

export default reduxForm({
  form: "golfroundwizard",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(StepTwo);
