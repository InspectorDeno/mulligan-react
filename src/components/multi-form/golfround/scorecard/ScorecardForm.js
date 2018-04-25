import React, { Component } from "react";
import { Grid, Input, Segment } from "semantic-ui-react";
import StrokeInput from "./StrokeInput";
import ScoreOutput from "./ScoreOutput";

class ScorecardForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      done: false
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange = (event, name) => {
    const score = event.target.value;
    // Do score calculations here

    this.setState({ [name]: score * 2 });
  };

  render() {
    return (
      <div>
        <Segment />
      </div>
    );
  }
}

export default ScorecardForm;
