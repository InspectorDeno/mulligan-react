import React from "react";
import { Segment } from "semantic-ui-react";
import { connect } from "react-redux";
import { formValueSelector } from "redux-form";
import moment from "moment";
import CreateGolfRoundModal from "../modals/CreateGolfRoundModal";

const DisplayJson = (data) => {
  console.log("submitting...");
  // window.alert(`${JSON.stringify(data, null, 2)}`)
};

let GolfRoundsPage = props => {
  return (
    <div>
      <Segment style={{ width: "100%" }}>
        <CreateGolfRoundModal onSubmit={DisplayJson} />
      </Segment>
      <Segment>Old rounds here</Segment>
    </div >
  );
}

GolfRoundsPage.propTypes = {};

function mapStateToProps(state) {
  return {
    values: state.form.golfroundwizard
  };
}

const selector = formValueSelector('createGolfRound');
GolfRoundsPage = connect(state => {
  const golfclub = selector(state, "golfclub");
  const golfdate = moment(selector(state, "golfdate")).toLocaleString();
  const golfplayers = selector(state, "golfplayers");
  return { golfclub, golfdate, golfplayers }
})(GolfRoundsPage)

export default connect(mapStateToProps)(GolfRoundsPage);
