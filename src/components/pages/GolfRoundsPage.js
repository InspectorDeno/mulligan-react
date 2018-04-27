import React from "react";
import { Header, Segment, Grid, Card } from "semantic-ui-react";

import CreateGolfRoundModal from "../modals/CreateGolfRoundModal";
import GolfRoundForm from "../multi-form/golfround/GolfRoundForm";

const GolfRoundsPage = () => (
  <div>
    <Header>Golf rounds</Header>
    <Grid>
      <Grid.Column width={6}>
        <Card raised>
          <Card.Content textAlign="center">
            <CreateGolfRoundModal />
          </Card.Content>
        </Card>
      </Grid.Column>
      <Grid.Column width={10}>
        <Segment raised>Old rounds here</Segment>
      </Grid.Column>
    </Grid>
    <Segment>
      <GolfRoundForm />
    </Segment>
  </div>
);

GolfRoundsPage.propTypes = {};

export default GolfRoundsPage;
