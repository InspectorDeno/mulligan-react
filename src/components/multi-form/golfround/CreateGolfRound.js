import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import ScorecardForm from "./scorecard/ScorecardForm";

export const pages = [
  <StepOne />,
  <StepTwo />,
  <StepThree />,
  <ScorecardForm />
];

const MultiFormGolfRoundComponent = ({ page }) => <div>{pages[page - 1]}</div>;

function mapStateToProps(state) {
  return {
    page: state.counter
  };
}

MultiFormGolfRoundComponent.propTypes = {
  page: PropTypes.number.isRequired
};

export default connect(mapStateToProps, {})(MultiFormGolfRoundComponent);
