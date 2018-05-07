import React from "react";
import PropTypes from 'prop-types';
import { Button, Feed } from "semantic-ui-react";

export const PendingFriendListObject = ({ pending, onRespond }) => (
  <Feed.Event>
    <Feed.Label icon="heart" />
    <Feed.Content>
      <Feed.Summary>
        {pending.username}
        <Button floated="right" size="tiny" negative icon="remove" onClick={() => onRespond(pending.username, false)} />
        <Button floated="right" size="tiny" positive icon="checkmark" onClick={() => onRespond(pending.username, true)} />
      </Feed.Summary>
      <Feed.Extra>Hcp: {pending.hcp}</Feed.Extra>
    </Feed.Content>
  </Feed.Event>
);

PendingFriendListObject.propTypes = {
  pending: PropTypes.bool.isRequired,
  onRespond: PropTypes.func.isRequired,
}

export const FriendListObject = ({ friend }) => (
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

FriendListObject.propTypes = {
  friend: PropTypes.shape({
    username: PropTypes.string.isRequired,
    hcp: PropTypes.number.isRequired,
  }).isRequired
}


