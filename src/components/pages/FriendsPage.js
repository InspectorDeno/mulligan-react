import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { first, findWhere } from "underscore";
import { Segment, Header, Card, Button, Divider, Message } from "semantic-ui-react";
import FindUserForm from "../forms/FindUserForm";
import FriendList from "../FriendComponent/FriendList";
import { addFriend } from "../../actions/friends";
import { findUser } from "../../actions/users";

// if pending friend request load pending cards
// if friends, load friend cards

class FriendsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: [],

    };
  }

  submit = data => this.props.findUser(data);

  renderFriendCardContent = () => {
    const { foundUser, friends } = this.props;

    if (foundUser.errors) {
      return (
        <Message header={foundUser.errors.add_friend} negative style={{ marginTop: 0 }} />
      )
    }
    if (foundUser.message) {
      return (
        <Message header={foundUser.message} positive style={{ marginTop: 0 }} />
      )
    }

    if ((findWhere(friends, foundUser)) !== undefined) {
      return (
        <Message header="Already friends" info style={{ marginTop: 0 }} />
      )
    }

    if (foundUser)
      return (
        <Button positive fluid onClick={() => this.props.addFriend(foundUser.username)}>
          Add Friend
        </Button >
      )

    return ""
  }

  render() {
    const { user, foundUser } = this.props;
    return (
      <div>
        <Segment.Group horizontal raised style={{ background: "#f3f4f5" }}>
          <Segment>
            <Header>Find Mulligan Users</Header>
            <Divider />
            <FindUserForm submit={this.submit} />
            <div>
              {foundUser && foundUser.username && (
                <div>
                  <Divider />
                  <Card style={{ marginTop: "30px" }}>
                    <Card.Content>
                      <Card.Header>{foundUser.username}</Card.Header>
                      <Card.Meta>Hcp: {foundUser.hcp}</Card.Meta>
                    </Card.Content>
                    {user.username !== foundUser.username && (
                      <this.renderFriendCardContent />
                    )}
                  </Card>
                </div>
              )}
            </div>
          </Segment>
          <Segment>
            <FriendList />
          </Segment>
        </Segment.Group>
      </div>
    );
  }
}

FriendsPage.propTypes = {
  findUser: PropTypes.func.isRequired,
  addFriend: PropTypes.func.isRequired,
  friends: PropTypes.arrayOf(PropTypes.object),
  foundUser: PropTypes.shape({}),
  user: PropTypes.shape({
    username: PropTypes.string.isRequired
  }).isRequired
};

FriendsPage.defaultProps = {
  foundUser: {},
  friends: []
}

function mapStateToProps(state) {
  return {
    user: state.user,
    foundUser: first(state.user.users),
    friends: state.user.friends
  };
}

export default connect(mapStateToProps, { findUser, addFriend })(FriendsPage);
