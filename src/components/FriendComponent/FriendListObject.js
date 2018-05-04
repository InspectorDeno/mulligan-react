import React from "react";
import { Button, Feed } from "semantic-ui-react";

const FriendListObject = props => {
  const { friend } = props;
  return (
    <Feed.Event>
      <Feed.Label icon="heart" />
      <Feed.Content>
        <Feed.Summary>
          {friend.email}
          <Button floated="right" size="tiny">
            Invite
          </Button>
          <Button floated="right" size="tiny">
            Remove
          </Button>
        </Feed.Summary>
        <Feed.Extra>Hcp: {friend.hcp}</Feed.Extra>
      </Feed.Content>
    </Feed.Event>
  );
};

export default FriendListObject;
