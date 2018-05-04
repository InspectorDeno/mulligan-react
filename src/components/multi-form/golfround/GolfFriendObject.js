import React from "react";
import { Segment, List, Item, Icon } from "semantic-ui-react";

const GolfFriendObject = props => {
  const { friend } = props;
  return (
    <div style={{ display: "flex" }}>
      <Icon size="big" name="heart" />
      <div>
        <Item.Content>
          <Item.Description>{friend.email}</Item.Description>
          <Item.Extra>Hcp: {friend.hcp}</Item.Extra>
        </Item.Content>
      </div>
    </div>
  );
};

export default GolfFriendObject;
