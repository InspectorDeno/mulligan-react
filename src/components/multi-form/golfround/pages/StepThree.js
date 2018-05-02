import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Button, Divider, Form } from "semantic-ui-react";
import InlineError from "../../../messages/InlineError";
import CreateNewPlayerForm from "./CreateNewPlayerForm";

class StepThree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCreatePlayer: false,
      loading: false,
      error: ""
    };
  }

  render() {
    const {
      loading,
      handleSubmit,
      previousPage,
      invalid,
      submitting,
      error
    } = this.props;

    return (
      <div>
        <h1>Step 3</h1>
        <p>Did u bring a friend?</p>
        <CreateNewPlayerForm />
        <Divider />
        <Button onClick={previousPage}>Previous</Button>
        <Button
          onClick={handleSubmit}
          disabled={invalid || submitting || error}
        >
          Next
        </Button>
      </div>
    );
  }
}

StepThree.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

StepThree = connect(mapStateToProps)(StepThree);

export default reduxForm({
  form: "golfroundwizard", //       <------ same form name
  destroyOnUnmount: false, //       <------ preserve form data
  forceUnregisterOnUnmount: true // <------ unregister fields on unmount
})(StepThree);
