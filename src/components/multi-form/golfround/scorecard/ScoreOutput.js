import React, { PureComponent } from "react";
import PropTypes from "prop-types";

class ScoreOutput extends PureComponent {
  render() {
    return <p>{this.props.dataSource}</p>;
  }
}

ScoreOutput.propTypes = {
  dataSource: PropTypes.number.isRequired
};

export default ScoreOutput;
