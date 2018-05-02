import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Button, Divider, Form } from "semantic-ui-react";
import InlineError from "../../../messages/InlineError";
import validate from "./validate";

class StepThree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCreatePlayer: false,
      loading: false,
      error: ""
    };
  }

  addNewPlayer = () => {
    this.setState({ showCreatePlayer: true });
  };

  savePlayer = () => {
    // TODO: Save player in DB?
    // Could do without
  };
  cancelNewPlayer = () => {
    this.setState({ showCreatePlayer: false });
  };

  validateName = name => (name ? undefined : "Required");

  createRenderer = render => ({ input, label, meta, type }) => (
    <div className={[meta.error && meta.touched ? "error" : ""]}>
      <label htmlFor="text" style={{ float: "left" }}>
        {label}
      </label>
      {meta.error && meta.touched && <InlineError text={meta.error} />}
      {render(input, label, type)}
    </div>
  );

  RenderInput = this.createRenderer((input, label, type) => (
    <div>
      <Form.Input placeholder={label} input={input} type={type} />
    </div>
  ));

  RenderSelect = this.createRenderer((input, label) => {
    const options = [
      { key: "m", text: "Male", value: "male" },
      { key: "f", text: "Female", value: "female" }
    ];

    return <Form.Select fluid options={options} placeholder={label} />;
  });

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
        {this.state.showCreatePlayer ? (
          <div style={{ display: "inline-block" }}>
            <Form loading={loading}>
              <Field
                name="playerName"
                label="Name"
                component={this.RenderInput}
                type="text"
                error={error}
              />
              <Field
                name="playerGender"
                label="Gender"
                component={this.RenderSelect}
              />
              <Field
                name="playerHcp"
                label="Hcp"
                component={this.RenderInput}
                type="number"
              />
            </Form>
            <div>
              <Button onClick={this.cancelNewPlayer}>Cancel</Button>
              <Button onClick={this.savePlayer} disabled={invalid}>
                Save
              </Button>
            </div>
          </div>
        ) : (
          <Button icon="plus" onClick={this.addNewPlayer} />
        )}
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
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(StepThree);
