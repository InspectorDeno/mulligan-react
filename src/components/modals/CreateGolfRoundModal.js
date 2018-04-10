import React, { Component } from "react";
import { Button, Modal } from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CreateGolfRound, {
  pages
} from "../multi-form/golfround/CreateGolfRound";
import { increment, decrement } from "../../actions/counter";

class CreateGolfRoundModal extends Component {
  state = {
    open: false,
    page: ""
  };

  componentWillReceiveProps(newProps) {
    this.setState({ page: newProps.step });
  }

  onIncrement = () => this.props.increment();
  onDecrement = () => this.props.decrement();

  closeConfigShow = (closeOnEscape, closeOnRootNodeClick) => () => {
    this.setState({ closeOnEscape, closeOnRootNodeClick, open: true });
  };

  close = () => this.setState({ open: false });

  render() {
    const { open, closeOnEscape, closeOnRootNodeClick } = this.state;

    return (
      <Modal
        style={{
          marginTop: "50px",
          marginLeft: "auto",
          marginRight: "auto"
        }}
        size="large"
        open={open}
        closeOnEscape={closeOnEscape}
        closeOnRootNodeClick={closeOnRootNodeClick}
        onClose={this.close}
        closeIcon
        dimmer="blurring"
        trigger={
          <Button onClick={this.closeConfigShow(true, false)}>
            Create Golf Round
          </Button>
        }
      >
        <Modal.Header>Golf Round</Modal.Header>
        <Modal.Content scrolling>
          <Modal.Description>
            <CreateGolfRound />
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          {this.props.step > 1 && (
            <Button color="orange" inverted onClick={() => this.onDecrement()}>
              Previous
            </Button>
          )}
          {this.props.step >= pages.length ? (
            <Button color="green" onClick={this.submit}>
              All done
            </Button>
          ) : (
            <Button color="orange" onClick={() => this.onIncrement()}>
              Next
            </Button>
          )}
        </Modal.Actions>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    step: state.counter
  };
}

CreateGolfRoundModal.propTypes = {
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired
};
export default connect(mapStateToProps, { increment, decrement })(
  CreateGolfRoundModal
);
