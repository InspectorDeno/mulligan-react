import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Button, Divider, Form, List, Header } from "semantic-ui-react";
import CreateNewPlayerForm from "./CreateNewPlayerForm";

class StepThree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCreatePlayer: false,
      loading: false,
      error: ""
    };
  }

  FriendPicker = ({ input, players }) => {
    console.log(input);
    const list = [];
    players.forEach(p => {
      list.push(
        <List.Item
          onClick={input.onChange}
          name={input.name}
          value={input.value}
        >
          <List.Content>
            <List.Header>{p.playerName}</List.Header>
          </List.Content>
        </List.Item>
      );
    });
    return list;
  };

  validate = data => {
    if (!data.selectedPlayers) {
      return "You need more players";
    }
    return undefined;
  };

  render() {
    const {
      handleSubmit,
      loading,
      previousPage,
      invalid,
      submitting,
      players
    } = this.props;

    if (players) {
      console.log(players);
    }

    return (
      <div>
        <Header>Add players</Header>
        <div>Select friends...</div>
        <Form onSubmit={handleSubmit}>
          <List selection>
            {players.length > 0 && (
              <Field
                name="selectedPlayers"
                component={this.FriendPicker}
                players={players}
                // This doesn't get selected atm...
              />
            )}
          </List>

          <CreateNewPlayerForm />
          <Divider />
          <Button onClick={previousPage}>Previous</Button>
          <Button disabled={invalid || submitting || loading}>Next</Button>
        </Form>
      </div>
    );
  }
}

StepThree.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  players: PropTypes.arrayOf(PropTypes.object).isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user,
    players: state.players.players
  };
}
StepThree = reduxForm({
  form: "golfroundwizard", //       <------ same form name
  destroyOnUnmount: false, //       <------ preserve form data
  forceUnregisterOnUnmount: true // <------ unregister fields on unmount
})(StepThree);
StepThree = connect(mapStateToProps)(StepThree);

export default StepThree;
