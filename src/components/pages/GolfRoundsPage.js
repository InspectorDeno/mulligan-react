import React, { PureComponent } from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Divider, Segment } from "semantic-ui-react";
import CreateGolfRoundModal from "../modals/CreateGolfRoundModal";
import { addScorecard } from '../../actions/users';
import GolfroundsList from "../GolfRoundComponents/GolfroundsList"

class GolfRoundsPage extends PureComponent {

  submit = data => {
    this.props.dispatch(addScorecard(data));
  }

  render() {
    return (
      <div>
        <div style={{ textAlign: "center" }}>
          <Divider hidden />
          <CreateGolfRoundModal onSubmit={this.submit} />
          <Divider hidden />
        </div>
        <GolfroundsList />
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
