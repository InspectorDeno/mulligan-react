import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import Datetime from "react-datetime";
import { Button, Divider } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import "./dateTime.css";

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

  DateTimePicker = ({ input, meta }) => (
    <div>
      {/* <span>{JSON.stringify(meta, 0, 2)}</span> */}
      {meta.error && <span>{meta.error}</span>}
      <Datetime
        name={input.name}
        dateFormat="ddd D/M"
        timeFormat="HH:mm"
        defaultValue={
          input.value.length === 0 ? new Date().setMinutes(0) : input.value
        }
        timeConstraints={{ minutes: { step: 5 } }}
        onChange={param => {
          input.onChange(param);
        }}
      />
    </div>
  );
  render() {
    const { handleSubmit, previousPage, invalid, submitting } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit}>
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
        </form>
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
  form: "golfroundwizard", //       <------ same form name
  destroyOnUnmount: false, //       <------ preserve form data
  forceUnregisterOnUnmount: true // <------ unregister fields on unmount
})(StepTwo);
