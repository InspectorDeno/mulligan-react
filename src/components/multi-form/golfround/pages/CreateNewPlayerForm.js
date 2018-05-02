import React, { Component } from "react";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import { Button, Form, Dropdown } from "semantic-ui-react";
import InlineError from "../../../messages/InlineError";
import validate from "./validate";

class CreateNewPlayerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: "",
      showCreatePlayer: false
    };
  }

  addNewPlayer = () => {
    this.setState({ showCreatePlayer: true });
  };

  cancelNewPlayer = () => {
    this.setState({ showCreatePlayer: false });
  };

  createRenderer = render => ({ input, label, meta, ...rest }) => (
    <div className={[meta.error && meta.touched ? "error" : ""]}>
      {/* {<span>{JSON.stringify(meta, 2, 0)}</span>} */}
      <label htmlFor="text" style={{ float: "left" }}>
        {label}
      </label>
      {meta.error && meta.touched && <InlineError text={meta.error} />}
      {render(input, label, rest)}
    </div>
  );

  RenderInput = this.createRenderer((input, label) => (
    <div>
      <Form.Input placeholder={label} input={input} type="text" />
    </div>
  ));
  RenderNumberInput = this.createRenderer((input, label) => (
    <div>
      <Form.Input placeholder={label} input={input} type="number" />
    </div>
  ));

  RenderSelect = this.createRenderer((input, label) => {
    const options = [
      { key: "m", text: "Male", value: "male" },
      { key: "f", text: "Female", value: "female" }
    ];
    return (
      <Dropdown
        {...input}
        placeholder={label}
        options={options}
        selection
        onChange={(param, data) => {
          input.onChange(data.value);
        }}
      />
    );
  });

  render() {
    const { loading, invalid } = this.props;
    return (
      <div>
        {this.state.showCreatePlayer ? (
          <div style={{ display: "inline-block" }}>
            <Form onSubmit={this.onSubmit} loading={loading}>
              <Field
                name="playerName"
                label="Name"
                component={this.RenderInput}
              />
              <Field
                name="playerGender"
                label="Gender"
                component={this.RenderSelect}
              />
              <Field
                name="playerHcp"
                label="Hcp"
                component={this.RenderNumberInput}
              />
              <Button onClick={this.cancelNewPlayer}>Cancel</Button>
              <Button color="blue" disabled={invalid}>
                Save
              </Button>
            </Form>
          </div>
        ) : (
          <Button icon="plus" onClick={this.addNewPlayer} />
        )}
      </div>
    );
  }
}

CreateNewPlayerForm.propTypes = {
  submit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired
};

export default reduxForm({
  form: "addNewPlayer", //       <------ same form name
  destroyOnUnmount: true, //       <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(CreateNewPlayerForm);
