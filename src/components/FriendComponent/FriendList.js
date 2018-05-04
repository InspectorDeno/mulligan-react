import React, { Component } from "react";
import { Header, Divider, Feed } from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getFriends } from "../../actions/users";
import FriendListObject from "./FriendListObject";

class FriendList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.dispatch(getFriends(this.props.user)).catch(err => {
      console.log(err);
      this.setState({ errors: err.response.data.errors });
    });
  }

  render() {
    const { friendData, errors } = this.props;
    if (friendData) {
      friendData.forEach(friend => console.log(friend.email));
    }
    return (
      <div>
        <Header>Friend List</Header>
        <Divider />
        <Feed>
          {friendData
            ? friendData.map(friend => <FriendListObject friend={friend} />)
            : errors.get_friends}
        </Feed>
      </div>
    );
  }
}

FriendList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  friendData: PropTypes.arrayOf(PropTypes.object).isRequired,
  user: PropTypes.shape({
    token: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    confirmed: PropTypes.bool.isRequired
  }).isRequired,
  errors: PropTypes.arrayOf(PropTypes.string).isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user,
    friendData: state.user.friends,
    errors: state.friends.errors
  };
}

export default connect(mapStateToProps)(FriendList);
