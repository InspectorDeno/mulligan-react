import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Segment, Header, Input } from "semantic-ui-react";
import FindUserForm from "../forms/FindUserForm";
import Pending from "../FriendComponent/Pending.js";
import Friends from "../FriendComponent/Friends.js";
import { getFriends } from "../../actions/friends";
import { connect } from "react-redux";


//if pending friend request load pending cards
//if friends, load friend cards



class FriendsPage extends Component {

    state = {
        friendData: [],
        loading: false,
        error: ""
    }

    componentWillMount() {
        this.props.dispatch(getFriends()).then(res => this.setState({ friendData: res.friends }))
    }



    render() {
        return (
            <div>
                <div>
                    <Segment>
                        <Header>Find other users</Header>
                        <FindUserForm submit={this.submit} />
                    </Segment>
                </div>

                hejsan

                <div>
                    <Friends />
                </div>

            </div>

        );
    }
}


FriendsPage.propTypes = {

    friendData: PropTypes.arrayOf(PropTypes.object).isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        friendData: state.friends.items,
        loading: state.friends.loading,
        error: state.friends.error
    }
}

export default connect(mapStateToProps)(FriendsPage);