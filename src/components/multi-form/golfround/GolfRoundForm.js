import React, { Component } from "react";
import PropTypes from "prop-types";
import StepOne from "./pages/StepOne";
import StepTwo from "./pages/StepTwo";
import StepThree from "./pages/StepThree";

class GolfRoundForm extends Component {
  constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.state = { page: 1 };
  }

  nextPage() {
    this.setState({ page: this.state.page + 1 });
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 });
  }

  render() {
    const { onSubmit } = this.props;
    const { page } = this.state;
    return (
      <div>
        {page === 1 && <StepOne onSubmit={this.nextPage} />}
        {page === 2 && (
          <StepTwo previousPage={this.previousPage} onSubmit={this.nextPage} />
        )}
        {page === 3 && (
          <StepThree previousPage={this.previousPage} onSubmit={onSubmit} />
        )}
      </div>
    );
  }
}

GolfRoundForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default GolfRoundForm;
