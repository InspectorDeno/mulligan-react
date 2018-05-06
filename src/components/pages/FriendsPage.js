import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { first, pick, find} from "underscore"
import { Segment, Header, Card, Button, Divider } from "semantic-ui-react";
import FindUserForm from "../forms/FindUserForm";
import FriendList from "../FriendComponent/FriendList";
import { addFriend } from "../../actions/friends";
import { findUser }from "../../actions/users";

// if pending friend request load pending cards
// if friends, load friend cards

class FriendsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: []
    };
  }

  submit = data => this.props.findUser(data);

  addFriend = email => {
    // TODO: This currently sends the whole user with tuns of props.. maybe don't do that
    this.props.addFriend(this.props.user, email);
  };

  render() {
    const { user, foundUser } = this.props;
    // const { errors } = this.state;
    return (
      <div>
        <Segment.Group horizontal raised style={{ background: "#f3f4f5" }}>
          <Segment secondary>
            <Header>Find Mulligan Users</Header>
            <Divider />
            <FindUserForm submit={this.submit} />
            <div>
              {
                foundUser && foundUser.username ? (
                <div>
                  <Divider />
                  <Card style={{ marginTop: "30px" }}>
                    <Card.Content>
                      <Card.Header>{foundUser.username}</Card.Header>
                      <Card.Meta>Hcp: {foundUser.hcp}</Card.Meta>
                    </Card.Content>
                    {user.username !== foundUser.username && 
                    <Card.Content extra>
                      {foundUser.errors ? foundUser.errors.add_friend : 
                      <Button
                        basic
                        fluid
                        color="green"
                        onClick={() => this.addFriend(foundUser.username)}
                      >
                        Add Friend
                      </Button>
                      }
                    </Card.Content>
                    }
                  </Card>
                </div>
              ) : (
                "Bajs"
              )}
            </div>
          </Segment>
          <Segment secondary>
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
  foundUser: PropTypes.arrayOf(PropTypes.object).isRequired,
  user: PropTypes.shape({
    token: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    confirmed: PropTypes.bool.isRequired
  }).isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user,
    foundUser: first(state.user.users)
  };
}

export default connect(mapStateToProps, { findUser, addFriend })(FriendsPage);
