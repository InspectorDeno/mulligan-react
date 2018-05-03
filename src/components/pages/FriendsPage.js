import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  Segment,
  Header,
  Card,
  Button,
  Message,
  Divider
} from "semantic-ui-react";
import FindUserForm from "../forms/FindUserForm";
import FriendList from "../FriendComponent/FriendList";
import { addFriend } from "../../actions/friends";
import { findUser } from "../../actions/users";

// if pending friend request load pending cards
// if friends, load friend cards

class FriendsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  submit = data =>
    this.props.dispatch(findUser(data)).catch(err => {
      console.log(err);
    });

  addFriend = email => {
    this.props.dispatch(addFriend(this.props.user, email)).catch(err => {
      const errors = {};
      errors.add_friend = err;
      this.setState({ errors });
    });
  };

  render() {
    const { errors, userData } = this.props;
    return (
      <div>
        <div>
          <Segment raised>
            <h1>Find Mulligan Users</h1>
            <Divider />
            {errors && errors.find_user ? (
              <Message error>{errors.find_user}</Message>
            ) : (
              ""
            )}
            <FindUserForm submit={this.submit} />
          </Segment>
        </div>
        <div>
          {userData && userData.email ? (
            <Card style={{ marginTop: "30px" }}>
              <Card.Content>
                <Card.Header>{userData.email}</Card.Header>
                <Card.Meta>Hcp: {userData.hcp}</Card.Meta>
              </Card.Content>
              <Card.Content extra>
                <Button
                  basic
                  fluid
                  color="green"
                  onClick={() => this.addFriend(userData.email)}
                >
                  {/* ONCKLICK, ADD FREIDN */}
                  Add Friend
                </Button>
              </Card.Content>
            </Card>
          ) : (
            ""
          )}
          <Segment style={{ marginTop: "30px" }}>
            <FriendList />
          </Segment>
        </div>
      </div>
    );
  }
}

FriendsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  userData: PropTypes.arrayOf(PropTypes.object).isRequired,
  errors: PropTypes.arrayOf(PropTypes.string).isRequired,
  user: PropTypes.shape({
    token: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    confirmed: PropTypes.bool.isRequired
  }).isRequired
};

function mapStateToProps(state) {
  return {
    userData: state.user.items,
    errors: state.user.errors
  };
}

export default connect(mapStateToProps)(FriendsPage);
