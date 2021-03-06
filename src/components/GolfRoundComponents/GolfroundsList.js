import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Loader, Dimmer, Segment } from "semantic-ui-react";
import { sortBy } from "underscore";
import { getScorecards } from "../../actions/users";
import GolfroundObject from "./GolfroundObject";

class GolfroundsList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.dispatch(getScorecards());
  }

  render() {
    const { error, scorecardData, loading } = this.props;
    const rounds = sortBy(scorecardData, "date").reverse();
    return (
      <div style={{ width: "100%", marginTop: "40px" }}>
        {loading ? (
          <Dimmer.Dimmable as={Segment} basic style={{ height: "165px" }}>
            <Loader active indeterminate>
              Fetching Scorecards...{" "}
            </Loader>
          </Dimmer.Dimmable>
        ) : (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between"
              }}
            >
              {rounds.length > 0
                ? rounds.map(data => (
                  <GolfroundObject data={data} error={error} />
                ))
                : "You haven't registered any golf rounds yet"}
            </div>
          )}
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
};

function mapStateToProps(state) {
  return {
    scorecardData: state.user.scorecards,
    loading: state.user.loading,
    error: state.user.errors
  };
}
export default connect(mapStateToProps)(GolfroundsList);
