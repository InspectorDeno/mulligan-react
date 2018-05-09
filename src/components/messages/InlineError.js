import React from "react";
import PropTypes from "prop-types";

const InlineError = ({ text }) => (
  <div style={{ color: "#ae5856", textAlign: "right", float: "right" }}>{text}</div>
);

InlineError.propTypes = {
  text: PropTypes.string.isRequired
};

export default InlineError;
