import React from "react";
import { Message } from "semantic-ui-react";

const ConfirmEmailMessage = () => (
  <Message error attached="bottom" style={{ margin: "0" }}>
    <Message.Header>Verify your email pls</Message.Header>
  </Message>
);

export default ConfirmEmailMessage;
