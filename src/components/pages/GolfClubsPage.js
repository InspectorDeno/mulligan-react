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
    const { error, golfClubData } = this.props;

    return (
      <Segment>
        <div>Finding Linköpings Golfklubb</div>
        <span>{error}</span>
        <span>{golfClubData.length > 0 && golfClubData[0].club}</span>
      </Segment>
    );
  }
}

GolfClubsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  golfClubData: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired
};

GolfClubsPage.defaultProps = {
  golfClubData: []
};

function mapStateToProps(state) {
  return {
    golfClubData: state.golfclub.items,
    loading: state.golfclub.loading,
    error: state.golfclub.error
  };
}

export default connect(mapStateToProps)(GolfClubsPage);
