import React from "react";
import { Segment, Grid } from "semantic-ui-react";
import { connect } from "react-redux";

import CreateGolfRoundModal from "../modals/CreateGolfRoundModal";
import GolfRoundForm from "../multi-form/golfround/GolfRoundForm";

const DisplayJson = data => window.alert(`${JSON.stringify(data, null, 2)}`);

const GolfRoundsPage = values => (
  <div>
    <Grid>
      <Grid.Column width={10}>
        <Segment raised>
          <GolfRoundForm onSubmit={DisplayJson} />
        </Segment>
        <Segment raised>Old rounds here</Segment>
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
