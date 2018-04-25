import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Segment, Header } from "semantic-ui-react";
import FindUserForm from "../forms/FindUserForm";
import Pending from "../FriendComponent/Pending";
import Friends from "../FriendComponent/Friends";
import { getFriends } from "../../actions/friends";

// if pending friend request load pending cards
// if friends, load friend cards

class FriendsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friendData: [],
      loading: false,
      error: ""
    };
  }

  componentDidMount() {
    console.log("HJEHEHEHE");
    console.log(this.props.user);
    this.props
      .dispatch(getFriends(this.props.user))
      .then(res => this.setState({ friendData: res.friendData }));
  }

  render() {
    const { friendData } = this.props;
    return (
      <div>
        <div>
          <Segment>
            <Header>Find other users</Header>
            <FindUserForm submit={this.submit} />
          </Segment>
        </div>
        {friendData}
        <div>
          <Friends />
        </div>
      </div>
    );
  }
}

FriendsPage.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  friendData: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    friendData: state.friends.items,
    loading: state.friends.loading,
    error: state.friends.error,
    user: state.user
  };
}

export default connect(mapStateToProps)(FriendsPage);
