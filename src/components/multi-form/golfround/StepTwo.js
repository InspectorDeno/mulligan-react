import moment from "moment";
import React, { Component } from "react";
import Datetime from "react-datetime";
import { Segment } from "semantic-ui-react";
import "./dateTime.css";

class StepTwo extends Component {
  state = {
    m: moment()
  };

  render() {
    return (
      <div>
        <Segment>
          <Datetime />
        </Segment>
      </div>
    );
  }
}

export default StepTwo;
