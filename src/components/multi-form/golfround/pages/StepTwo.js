import React from "react";
import PropTypes from "prop-types";
import Datetime from "react-datetime";
import { Button } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import "./dateTime.css";

const DateTimePicker = field => (
  <div>
    <Datetime
      name={field.input.name}
      dateFormat="ddd D/M"
      timeFormat="HH:mm"
      onChange={param => field.input.onChange(param)}
    />
  </div>
);

const StepTwo = props => {
  const { handleSubmit, previousPage } = props;
  return (
    <div>
      <Field name="selectedDate" component={DateTimePicker} />
      <div>
        <Button onClick={previousPage}>Previous</Button>
        <Button onClick={handleSubmit}>Next</Button>
      </div>
    </div>
  );
};

StepTwo.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired
};

export default reduxForm({
  form: "golfroundwizard", //       <------ same form name
  destroyOnUnmount: false, //       <------ preserve form data
  forceUnregisterOnUnmount: true // <------ unregister fields on unmount
})(StepTwo);
