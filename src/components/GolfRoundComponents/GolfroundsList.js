import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Loader, Divider, Header } from "semantic-ui-react";
import { getScorecards } from "../../actions/users";
import Scorecard from "./Scorecard"
import GolfroundObject from './GolfroundObject';

class GolfroundsList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.props.dispatch(getScorecards());
  }

  render() {
    const { error, scorecardData, loading } = this.props;
    return (
      <div style={{ width: "100%" }}>
        <Header as="h1">Golf Rounds</Header>
        {loading ?
          <Loader active indeterminate>Fetching Scorecards... </Loader> :
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
            {scorecardData.length > 0
              ? scorecardData.map(data => (
                <GolfroundObject data={data} error={error} />
              ))
              : "You haven't added any scorecards yet"}
          </div>
        }
      </div>
    );
  }
}

GolfroundsList.propTypes = {
  scorecardData: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  error: PropTypes.string,
  dispatch: PropTypes.func.isRequired
};

GolfroundsList.defaultProps = {
  scorecardData: [],
  loading: false,
  error: ""
}

function mapStateToProps(state) {
  return {
    scorecardData: state.user.scorecards,
    loading: state.user.loading,
    error: state.user.errors
  };
}
export default connect(mapStateToProps)(GolfroundsList);
