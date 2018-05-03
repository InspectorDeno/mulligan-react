import React, { Component } from "react";
import { Header, Divider } from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getFriends } from "../../actions/friends";

class FriendList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props
      .dispatch(getFriends(this.props.user))
      .then(res => {
        this.setState({ friendData: res.friendData });
      })
      .catch(err => this.setState({ errors: err.response.data.errors }));
  }

  render() {
    const { friendData, errors } = this.props;
    return (
      <div>
        <Header>Friend List</Header>
        <Divider />
        {friendData.length > 0 ? friendData : errors.get_friends}
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
    friendData: state.friends.items,
    errors: state.friends.errors
  };
}

export default connect(mapStateToProps)(FriendList);
