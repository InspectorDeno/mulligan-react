import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Header, Segment, Grid, Card, Divider } from "semantic-ui-react";

import ConfirmEmailMessage from "../messages/ConfirmEmailMessage";
import CreateGolfRoundModal from "../modals/CreateGolfRoundModal";

class GolfRoundsPage extends PureComponent {
  render() {
    const { isConfirmed } = this.props;
    return (
      <div>
        <div>{!isConfirmed && <ConfirmEmailMessage />}</div>
        <Header>Golf rounds</Header>
        <Grid centered>
          <Grid.Column width={6}>
            <Card centered raised>
              <Card.Content textAlign="center">
                <Card.Header>Add new golf round</Card.Header>
                <Divider />
                <CreateGolfRoundModal />
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column width={10}>
            <Segment raised>Old rounds here</Segment>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

GolfRoundsPage.propTypes = {
  isConfirmed: PropTypes.bool.isRequired
};
function mapStateToProps(state) {
  return {
    isConfirmed: !!state.user.confirmed
  };
}

export default connect(mapStateToProps, {})(GolfRoundsPage);
