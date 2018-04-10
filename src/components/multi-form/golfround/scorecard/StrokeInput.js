import React, { PureComponent } from "react";
import PropTypes from "prop-types";

class StrokeInput extends PureComponent {
  render() {
    return (
      <input
        type="number"
        id="s1"
        onChange={this.props.onChange}
        style={{ height: "40px", width: "50px", fontSize: "20px" }}
      />
    );
  }
}

StrokeInput.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default StrokeInput;
