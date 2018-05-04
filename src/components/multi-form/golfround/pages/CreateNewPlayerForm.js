import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Button, Form, Dropdown, Segment } from "semantic-ui-react";
import InlineError from "../../../messages/InlineError";
import validate from "./validate";
import { addPlayer } from "../../../../actions/players";

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
      <div>
        <Dropdown
          {...input}
          placeholder={label}
          options={options}
          selection
          onChange={(param, data) => {
            input.onChange(data.value);
          }}
          style={{ width: "100%" }}
        />
      </div>
    );
  });

  CreateNewPlayer = data => {
    this.props.dispatch(addPlayer(data));
    this.cancelNewPlayer();
  };

  render() {
    const { loading, invalid, handleSubmit } = this.props;
    return (
      <Segment raised size="huge">
        {this.state.showCreatePlayer ? (
          <div style={{ display: "inline-block" }}>
            <Form loading={loading}>
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
              <Button
                onClick={handleSubmit(this.CreateNewPlayer)}
                color="blue"
                disabled={invalid}
              >
                Save
              </Button>
            </Form>
          </div>
        ) : (
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <div>Add new Player</div>
            <Button
              style={{ float: "right" }}
              icon="plus"
              onClick={this.addNewPlayer}
            />
          </div>
        )}
      </Segment>
    );
  }
}

CreateNewPlayerForm.propTypes = {
  submit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  addPlayer: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
};

CreateNewPlayerForm = reduxForm({
  form: "addNewPlayer", //       <------ same form name
  destroyOnUnmount: true, //       <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(CreateNewPlayerForm);

CreateNewPlayerForm = connect(null, { addPlayer })(CreateNewPlayerForm);

export default CreateNewPlayerForm;
