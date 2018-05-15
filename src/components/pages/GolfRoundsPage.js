import React, { PureComponent } from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Segment } from "semantic-ui-react";
import CreateGolfRoundModal from "../modals/CreateGolfRoundModal";
import { submitScorecard } from '../../actions/users';

class GolfRoundsPage extends PureComponent {

  submit = data => {
    this.props.dispatch(submitScorecard(data));
  }

  render() {
    return (
      <div>
        <Segment style={{ width: "100%" }}>
          <CreateGolfRoundModal onSubmit={this.submit} />
        </Segment>
        <Segment>Old rounds here</Segment>
      </div >
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

GolfRoundsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

export default connect(mapStateToProps)(GolfRoundsPage);
