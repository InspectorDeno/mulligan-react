import React, {
  Component
} from "react";
import {
  Header,
  Divider,
  Feed
} from "semantic-ui-react";
import PropTypes from "prop-types";
import {
  connect
} from "react-redux";
import {
  getFriends
} from "../../actions/users";
import FriendListObject from "./FriendListObject";

class FriendList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.dispatch(getFriends(this.props.user));
  }

  render() {
    const {
      friendData
    } = this.props;
    if (friendData) {
      friendData.forEach(friend => console.log(friend.email));
    }
    return ( 
    <div >
      <Header > Friend List </Header> 
      <Divider/>
      <Feed > {
        friendData.length > 0 ?
        friendData.map(friend => < FriendListObject friend = {
            friend
          }
          />): "You have no friends"
        } </Feed> </div>
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
  };

  function mapStateToProps(state) {
    return {
      user: state.user,
      friendData: state.user.friends,
    };
  }

  export default connect(mapStateToProps)(FriendList);