import React from "react";
import { Header, Input } from "semantic-ui-react";
import FindUserForm from "../forms/FindUserForm"


const FriendsPage = () => (
    <div>
        <Header>Find other users</Header>
        <FindUserForm submit={this.submit}/>
    </div>
);

FriendsPage.propTypes = {};

export default FriendsPage;