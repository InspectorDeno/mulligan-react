import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Button, Dropdown, Divider, Message, Header } from "semantic-ui-react";
import { getGolfClub } from "../../../../actions/golfclubs";

const golfClubs = [
  "Linköpings Golfklubb",
  "Landeryds Golfklubb",
  "Vreta Kloster Golfklubb",
  "Vårdsbergs Golfklubb"
];

// TODO: Add server call att redux-form/CHANGE action
class StepOne extends Component {
  constructor(props) {
    super(props);
    this.state = {
      golfClubData: [],
      loading: false,
      error: ""
    };
  }

  ReduxFormDropDown = field => (
    <div>
      <Dropdown
        {...field.input}
        {...field.custom}
        options={field.options}
        placeholder={field.placeholder}
        value={field.input.value}
        loading={field.loading}
        onChange={(param, data) => {
          // console.log(data);
          this.RequestData(data);
          field.input.onChange(data.value);
        }}
        selection
      />
    </div>
  );

  RequestData = data => {
    this.setState({ loading: true });
    this.props
      .getGolfClub(data.value)
      .then(
        res =>
          res
            ? this.setState({ golfClubData: res.golfClubData })
            : this.setState({ error: this.props.error })
      );
    this.setState({ loading: false });
  };

  render() {
    const { handleSubmit, loading, error, submitting, pristine } = this.props;
    return (
      <div>
        <Header>Select Golf Club</Header>
        <Field
          name="selectedClub"
          component={this.ReduxFormDropDown}
          placeholder="Select"
          loading={loading}
          options={golfClubs.map(val => ({
            value: val,
            key: val,
            text: val
          }))}
        />
        {error && <Message error>{error}</Message>}
        <div>
          <Divider />
          <Button
            onClick={handleSubmit}
            disabled={pristine || submitting || !!error || loading}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }
}

StepOne.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  getGolfClub: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  golfClubData: state.golfclub.items,
  loading: state.golfclub.loading,
  error: state.golfclub.error
});

StepOne = connect(mapStateToProps, { getGolfClub })(StepOne);

export default reduxForm({
  form: "golfroundwizard", //        <------ same form name
  destroyOnUnmount: false, //        <------ preserve form data
  forceUnregisterOnUnmount: true // <------ unregister fields on unmount
})(StepOne);
