import React from "react";
import { Button, Feed } from "semantic-ui-react";

export const PendingFriendListObject = props => {
  const { pending } = props;
  return (
    <Feed.Event>
      <Feed.Label icon="heart" />
      <Feed.Content>
        <Feed.Summary>
          {pending.username}
          <Button floated="right" size="tiny" color="green" icon="checkmark" />
          <Button floated="right" size="tiny" color="red" icon="remove" />
        </Feed.Summary>
        <Feed.Extra>Hcp: {pending.hcp}</Feed.Extra>
      </Feed.Content>
    </Feed.Event>
  );
};

export const FriendListObject = props => {
  const { friend } = props;
  return (
    <Feed.Event>
      <Feed.Label icon="heart" />
      <Feed.Content>
        <Feed.Summary>
          {friend.username}
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
