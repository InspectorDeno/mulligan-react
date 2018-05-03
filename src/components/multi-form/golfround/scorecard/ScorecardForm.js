import React, { Component } from "react";
import { Divider, Button } from "semantic-ui-react";
import { reduxForm } from "redux-form";
import PropTypes from "prop-types";
import StrokeInput from "./StrokeInput";
import ScoreOutput from "./ScoreOutput";

class ScorecardForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      done: false
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange = (event, name) => {
    const score = event.target.value;
    // Do score calculations here

    this.setState({ [name]: score * 2 });
  };

  render() {
    const {
      handleSubmit,
      previousPage,
      invalid,
      submitting,
      loading
    } = this.props;
    return (
      <div>
        <Divider />
        <Button onClick={previousPage}>Previous</Button>
        <Button
          onClick={handleSubmit}
          disabled={invalid || submitting || loading}
        >
          Next
        </Button>
      </div>
    );
  }
}

ScorecardForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired
};

export default reduxForm({
  form: "golfroundwizard", //        <------ same form name
  destroyOnUnmount: false, //        <------ preserve form data
  forceUnregisterOnUnmount: true // <------ unregister fields on unmount
})(ScorecardForm);
