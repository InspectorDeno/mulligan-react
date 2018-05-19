import React, { Component } from "react";
import { Header, Divider, Feed, Loader, Segment, Dimmer } from "semantic-ui-react";
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
    this.props.dispatch(getFriends());
    this.props.dispatch(getPending());
  }

  respond = (username, verdict) => {
    this.props.dispatch(respondFriendRequest(username, verdict));
  }

  render() {
    const { friendData, pendingData, loading } = this.props;

    return (
      <div style={{ width: "100%" }}>
        {loading ?
          <Loader active indeterminate>Fetching Friends... </Loader> :
          <div>
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
                ? friendData.map(friend => <FriendListObject friend={friend} />)
                : "You have no friends"}
            </Feed>
          </div>
        }
      </div>
    );
  }
}

FriendList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  friendData: PropTypes.arrayOf(PropTypes.object),
  pendingData: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
};

FriendList.defaultProps = {
  friendData: [],
  pendingData: [],
  loading: false
}

function mapStateToProps(state) {
  return {
    friendData: state.user.friends,
    pendingData: state.user.pending,
    loading: state.user.loading
  };
}

export default connect(mapStateToProps)(FriendList);
