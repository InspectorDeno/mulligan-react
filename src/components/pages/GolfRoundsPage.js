import React from "react";
import { Segment, Grid, Header } from "semantic-ui-react";
import { connect } from "react-redux";

import CreateGolfRoundModal from "../modals/CreateGolfRoundModal";
import GolfRoundForm from "../multi-form/golfround/GolfRoundForm";

const DisplayJson = data => window.alert(`${JSON.stringify(data, null, 2)}`);

const GolfRoundsPage = values => (
  <div>
    <Grid>
      <Grid.Column>
        <Segment.Group raised>
          <Segment attached="top">
            <h2>Create Golf Round</h2>
          </Segment>
          <Segment attached="bottom" padded style={{ minHeight: "300px" }}>
            <GolfRoundForm onSubmit={DisplayJson} />
          </Segment>
        </Segment.Group>
        <Segment>Old rounds here</Segment>
      </Grid.Column>
    </Grid>
    {/* <Segment>{values && JSON.stringify(values)}</Segment> */}
  </div>
);

GolfRoundsPage.propTypes = {};

function mapStateToProps(state) {
  return {
    values: state.form.golfroundwizard
  };
}

export default connect(mapStateToProps)(GolfRoundsPage);
