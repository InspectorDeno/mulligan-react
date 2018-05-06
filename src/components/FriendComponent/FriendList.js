import React, { Component } from "react";
import { Header, Divider, Feed } from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getFriends, getPending } from "../../actions/users";
import { FriendListObject, PendingFriendListObject } from "./FriendListObject";

class FriendList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.dispatch(getFriends(this.props.user));
    this.props.dispatch(getPending(this.props.user));
  }

  render() {
    const { friendData, pendingData } = this.props;

    return (
      <div>
        {pendingData &&
          pendingData.length >
            0(
              <div>
                <Header> Pending </Header>
                <Divider />
                <Feed>
                  {" "}
                  {friendData.length > 0
                    ? friendData.map(pending => (
                        <PendingFriendListObject pending={pending} />
                      ))
                    : "No pending friend requests"}
                </Feed>
              </div>
            )}
        <Header> Friend List </Header>
        <Divider />
        <Feed>
          {" "}
          {friendData.length > 0
            ? friendData.map(friend => <FriendListObject friend={friend} />)
            : "You have no friends"}{" "}
        </Feed>{" "}
      </div>
    );
  }
}

FriendList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  friendData: PropTypes.arrayOf(PropTypes.object).isRequired,
  pendingData: PropTypes.arrayOf(PropTypes.object).isRequired,
  user: PropTypes.shape({
    token: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    confirmed: PropTypes.bool.isRequired
  }).isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user,
    friendData: state.user.friends,
    pendingData: state.user.pending
  };
}

export default connect(mapStateToProps)(FriendList);
