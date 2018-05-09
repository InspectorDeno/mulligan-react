import React, { Component } from "react";
import { Header, Divider, Feed } from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getFriends, getPending, respondFriendRequest } from "../../actions/users";
import { FriendListObject, PendingFriendListObject } from "./FriendListObject";

class FriendList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.dispatch(getFriends(this.props.user.username));
    this.props.dispatch(getPending(this.props.user.username));
  }

  respond = (username, verdict) => {
    this.props.dispatch(respondFriendRequest(this.props.user.username, username, verdict));
  }

  render() {
    const { friendData, pendingData } = this.props;

    return (
      <div
        style={{
          width: "100%"
        }}
      >
        {pendingData &&
          pendingData.length > 0 && (
            <div>
              <Header>Pending Friends</Header> <Divider />
              <Feed>
                {pendingData.length > 0
                  ? pendingData.map(pending => (
                    <PendingFriendListObject pending={pending} onRespond={this.respond} />
                  ))
                  : "No pending friend requests"}
              </Feed>
            </div>
          )}
        <Header> Friends </Header> <Divider />
        <Feed>
          {friendData.length > 0
            ? friendData.map((friend) => <FriendListObject friend={friend} />)
            : "You have no friends"}
        </Feed>
      </div>
    );
  }
}

FriendList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  friendData: PropTypes.arrayOf(PropTypes.object),
  pendingData: PropTypes.arrayOf(PropTypes.object),
  user: PropTypes.shape({
    username: PropTypes.string.isRequired
  }).isRequired
};

FriendList.defaultProps = {
  friendData: [],
  pendingData: []
}

function mapStateToProps(state) {
  return {
    user: state.user,
    friendData: state.user.friends,
    pendingData: state.user.pending
  };
}

export default connect(mapStateToProps)(FriendList);
