import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { reduxForm, formValueSelector } from "redux-form";
import moment from "moment";
import { Button, Modal, Grid, Label } from "semantic-ui-react";
import validate from "../CreateGolfRound/validate";
import RemoteSubmitButton from "../CreateGolfRound/RemoteSubmitButton";
import * as actions from "../../actions/golfrounds"
import StepOne from "../CreateGolfRound/StepOne";
import StepTwo from "../CreateGolfRound/StepTwo";
import StepThree from "../CreateGolfRound/StepThree";
import StepFour from "../CreateGolfRound/StepFour";

class CreateGolfRoundModal extends Component {
  constructor(props) {
    super(props)
    this.nextPage = this.nextPage.bind(this)
    this.previousPage = this.previousPage.bind(this)
    this.state = {
      page: 1
    }
  };

  nextPage() {
    this.setState({ page: this.state.page + 1 })
  }
  previousPage() {
    this.setState({ page: this.state.page - 1 })
  }

  closeConfigShow = (closeOnEscape, closeOnRootNodeClick) => () => {
    this.setState({ closeOnEscape, closeOnRootNodeClick, open: true });
  };

  close = () => {
    this.props.dispatch(this.props.reset);
    this.setState({ open: false, page: 1 })
  };

  render() {
    const { open, closeOnEscape, closeOnRootNodeClick, page } = this.state;
    const { invalid, submitting, golfclubError, loading } = this.props;

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
        trigger={
          <Button onClick={() => {
            this.closeConfigShow(true, false);
            this.setState({ open: true });
          }}>
            Create Golf Round
          </Button>
        }
      >
        <Modal.Header>Create Golf Round</Modal.Header>
        <Modal.Content scrolling
          style={{ minHeight: "300px" }}
        >
          <Modal.Description>
            {page === 1 && <StepOne />}
            {page === 2 && <StepTwo />}
            {page === 3 && <StepThree />}
            {page === 4 && <StepFour />}
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>

          <div style={{ display: "flex", justifyContent: "center" }}>
            {page === 1 &&
              <Button size="huge" color="yellow" onClick={this.nextPage} disabled={invalid || golfclubError || loading}
              > Next </Button>
            }
            {page === 2 &&
              <div>
                <Button size="huge" color="blue" inverted onClick={this.previousPage}
                >Previous
                </Button>
                <Button size="huge" color="blue" onClick={this.nextPage} disabled={invalid}
                >Next
                </Button>
              </div>
            }
            {page === 3 &&
              <div>
                <Button size="huge" color="purple" inverted onClick={this.previousPage}
                >Previous
                </Button>
                <Button size="huge" color="purple" onClick={this.nextPage} disabled={invalid}
                >Next
                </Button>
              </div>
            }
            {page === 4 &&
              <div>
                <Button size="huge" color="orange" inverted onClick={this.previousPage}
                >Previous
                </Button>
                <RemoteSubmitButton disabled={invalid || submitting} />
              </div>
            }
          </div>
        </Modal.Actions>
      </Modal >
    );
  }
}
CreateGolfRoundModal.propTypes = {
  dispatch: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  golfclubError: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
};

const selector = formValueSelector('createGolfRound');
CreateGolfRoundModal = connect(state => {
  const golfclub = selector(state, "golfclub");
  const golfdate = moment(selector(state, "golfdate")).toLocaleString();
  const golfplayers = selector(state, "golfplayers");
  return {
    golfclub,
    golfdate,
    golfplayers,
    golfclubError: !!state.golfclub.error,
    loading: state.golfclub.loading,
    user: state.user
  }
})(CreateGolfRoundModal)


CreateGolfRoundModal = reduxForm({
  form: "createGolfRound",
  keepDirtyOnReinitialize: true,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(CreateGolfRoundModal);

CreateGolfRoundModal = connect(state => ({
  initialValues: {
    golfdate: moment(new Date(Date.now()).setMinutes(0)).toDate(),
    golfplayers: [{
      playerName: state.user.username,
      playerHcp: state.user.hcp.value,
      playerGender: state.user.gender,
      playerTee: state.user.gender === "male" ? "Yellow" : "Red"
    }]
  }
}), { load: actions.loadPlayer })(CreateGolfRoundModal)
export default CreateGolfRoundModal;
