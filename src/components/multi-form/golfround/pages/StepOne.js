import React from "react";
import PropTypes from "prop-types";
import { Field, reduxForm, propTypes } from "redux-form";
import { Button, Select, Dropdown } from "semantic-ui-react";

const golfClubs = [
  "Linköpings Golfklubb",
  "Landeryds Golfklubb",
  "Vreta Kloster Golfklubb",
  "Vårdsbergs Golfklubb"
];
const golfClubOptions = [
  { key: "1", value: "link", text: "Linköpings Golfklubb" },
  { key: "2", value: "land", text: "Landeryds Golfklubb" }
];

const ReduxFormDropDown = field => (
  <div>
    <Dropdown
      {...field.input}
      {...field.custom}
      options={field.options}
      placeholder={field.placeholder}
      value={field.input.value}
      onChange={(param, data) => field.input.onChange(data.value)}
      selection
    />
  </div>
);

const StepOne = props => {
  const { handleSubmit } = props;
  return (
    <div>
      <h1>Step One</h1>
      <p>Please Select Golf Club</p>
      <Field
        name="selectedClub"
        component={ReduxFormDropDown}
        placeholder="Select Golf Club"
        options={golfClubs.map(val => ({
          value: val,
          key: val,
          text: val
        }))}
      />
      <div>
        <Button onClick={handleSubmit}>Next</Button>
      </div>
    </div>
  );
};

StepOne.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

export default reduxForm({
  form: "golfroundwizard", //        <------ same form name
  destroyOnUnmount: false, //        <------ preserve form data
  forceUnregisterOnUnmount: true // <------ unregister fields on unmount
})(StepOne);
