import React, { Component } from "react";
import { Segment } from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getGolfClub } from "../../actions/golfclubs";

// if pending friend request load pending cards
// if friends, load friend cards

class GolfClubsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      golfClubData: [],
      loading: false,
      error: ""
    };
  }

  componentDidMount() {
    this.props
      .dispatch(getGolfClub("Linköpings Golfklubb"))
      .then(res => this.setState({ golfClubData: res.golfClubData }));
  }

  render() {
    return <Segment>Finding Linköpings Golfklubb</Segment>;
  }
}

GolfClubsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  golfClubData: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    golfClubData: state.golfclub.golfClubData,
    loading: state.golfclub.loading,
    error: state.golfclub.error
  };
}

export default connect(mapStateToProps)(GolfClubsPage);
