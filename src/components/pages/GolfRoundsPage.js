import React from "react";
import { Segment, Grid, Header } from "semantic-ui-react";
import { connect } from "react-redux";
import moment from "moment";

import { formValueSelector } from "redux-form";

// import CreateGolfRoundModal from "../modals/CreateGolfRoundModal";
import GolfRoundForm from "../multi-form/golfround/GolfRoundForm";
import ActualScorecardForm from "../CreateGolfRound/ActualScorecardForm";

const DisplayJson = (data) => {
  console.log("submitting...");
  console.log(data.target);
  // window.alert(`${JSON.stringify(data, null, 2)}`)
};

let GolfRoundsPage = props => {
  const { golfclub, golfdate, golfplayers } = props;
  return (
    <div>
      <Segment.Group horizontal>
        <Segment style={{ width: "100%" }}>
          <ActualScorecardForm onSubmit={DisplayJson} />
        </Segment>
        <Segment style={{ width: "100%" }}>
          <p>{golfclub}</p>
          <p>{golfdate}</p>
          {golfplayers && golfplayers.length > 0 && golfplayers.map(player => <p>{player.playerName}{player.playerHcp}{player.playerTee}</p>)}
        </Segment>
      </Segment.Group>
      <Grid>
        <Grid.Column>
          <Segment.Group>
            <Segment>
              <Header as="h2">Create golfround</Header>
            </Segment>
            <Segment.Group raised horizontal style={{ background: "#f3f4f5" }}>
              <Segment attached="bottom" padded style={{ minHeight: "300px" }}>
                <GolfRoundForm onSubmit={DisplayJson} />
              </Segment>
              <Segment style={{ width: "100%" }}>DATA</Segment>
            </Segment.Group>
          </Segment.Group>
          <Segment>Old rounds here</Segment>
        </Grid.Column>
      </Grid>
    </div>
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
