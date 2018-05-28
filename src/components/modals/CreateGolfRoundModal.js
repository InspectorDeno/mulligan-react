import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { reduxForm, formValueSelector, submit, arrayPush } from "redux-form";
import moment from "moment";
import { reduce, find, pick } from "underscore";
import { Button, Modal, Icon, Loader, Dimmer } from "semantic-ui-react";
import validate from "../CreateGolfRound/validate";
import StepOne from "../CreateGolfRound/StepOne";
import StepTwo from "../CreateGolfRound/StepTwo";
import StepThree from "../CreateGolfRound/StepThree";
import StepFour from "../CreateGolfRound/StepFour";



class CreateGolfRoundModal extends Component {
  constructor(props) {
    super(props)
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.state = {
      page: 1,
      calculating: false
    }
  };

  nextPage() {
    this.setState({ page: this.state.page + 1 });
  }
  previousPage() {
    this.setState({ page: this.state.page - 1 });
  }

  closeConfigShow = (closeOnEscape, closeOnRootNodeClick) => () => {
    this.setState({ closeOnEscape, closeOnRootNodeClick, open: true });
  };

  close = () => {
    this.setState({ open: false, page: 1, calculating: false });
  };

  calculateEGA = (hcp, gross) => {
    let hcpGroup = 0;
    if (hcp <= 4.4) { // 
      hcpGroup = 1
    } else if (hcp >= 4.5 && hcp <= 11.4) {
      hcpGroup = 2
    } else if (hcp >= 11.5 && hcp <= 18.4) {
      hcpGroup = 3
    } else if (hcp >= 17.5 && hcp <= 26.4) {
      hcpGroup = 4
    } else if (hcp >= 26.5 && hcp <= 36.0) {
      hcpGroup = 5
    } else if (hcp > 36.0) {
      hcpGroup = 6
    }

  }

  calculateStats = () => {
    const { golfplayers, golfscores, golfholes, handleSubmit } = this.props

    golfplayers.forEach(player => {
      let played = 0;
      let grossScore = 0;
      let netScore = 0;
      let putts = 0;
      let penalties = 0;
      let fir = 0;
      let gir = 0;
      let pars = 0;
      let eagles = 0;
      let birdies = 0;
      let bogies = 0;
      let dbogies = 0;
      let tbogies = 0;
      let worse = 0;
      let par3s = 0;
      let par4s = 0;
      let par5s = 0;
      let par3score = 0;
      let par4score = 0;
      let par5score = 0;

      golfscores.forEach(hole => {
        const scoreObject = reduce(pick(hole, player.playerName), "score");
        const par = find(golfholes, { number: hole.hole }).par;
        if (scoreObject !== undefined) {
          played += 1;
          const score = Number(scoreObject.score);
          grossScore += score;
          // if (player.hcpRound) netScore = calculateEGA(player.playerHcp, grossScore);
          if (scoreObject.putts) putts += Number(scoreObject.putts);
          if (scoreObject.penalties) penalties += Number(scoreObject.penalties);
          if (scoreObject.drive && scoreObject.drive === "fairway") fir += 1;
          if (scoreObject.drive && scoreObject.drive === "green") gir += 1;
          switch (score - par) {
            case 4: worse += 1
              break;
            case 3: tbogies += 1
              break;
            case 2: dbogies += 1
              break;
            case 1: bogies += 1
              break;
            case 0: pars += 1
              break;
            case -1: birdies += 1
              break;
            case -2: eagles += 1
              break;
            default:
              break;
          }
          if (par === 3) {
            par3s += 1;
            par3score += score
          }
          if (par === 4) {
            par4s += 1;
            par4score += score
          }
          if (par === 5) {
            par5s += 1;
            par5score += score
          }

        }
      })
      this.props.dispatch(arrayPush("createGolfRound", "golfstats",
        {
          player: `${player.playerName}`,
          scores: {
            grossScore,
            netScore,
            putts,
            penalties
          },
          regulations: {
            fir,
            gir,
            firpercent: fir / played,
            girpercent: gir / played,
          },
          strokeTerms: {
            worse,
            tbogies,
            dbogies,
            bogies,
            pars,
            birdies,
            eagles
          },
          averages: {
            par3avg: par3score / par3s,
            par4avg: par4score / par4s,
            par5avg: par5score / par5s,
          }

        }));
    })
    // handleSubmit(close());
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
    this.setState({ calculating: true });

    sleep(1000).then(() => handleSubmit(this.close()))
  }

  render() {
    const { open, closeOnEscape, closeOnRootNodeClick, page, calculating } = this.state;
    const { anyTouched, invalid, submitting, golfclubError, loading } = this.props;

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
        onOpen={() => this.props.dispatch(this.props.reset)}
        closeIcon
        trigger={
          <Button
            icon
            labelPosition="right"
            color="yellow"
            size="huge"
            onClick={() => {
              this.closeConfigShow(true, false);
              this.setState({ open: true });
            }}><Icon name="plus" />
            Add New Golf Round
          </Button>
        }
      >
        <Modal.Header>Add New Golf Round</Modal.Header>
        <Modal.Content
          scrolling
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
            {calculating &&
              <Dimmer active>
                <Loader size="big">Saving Round...</Loader>
              </Dimmer>
            }

            {page === 1 &&
              <Button size="huge" color="yellow" onClick={this.nextPage} disabled={!anyTouched || invalid || golfclubError || loading}
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
                <Button size="huge" color="orange" disabled={invalid || submitting} onClick={this.calculateStats}
                >All done
                </Button>
              </div>
            }
          </div>
        </Modal.Actions>
      </Modal>
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
  const golfplayers = selector(state, "golfplayers");
  const golfdate = moment(selector(state, "golfdate")).toLocaleString();
  const golfholes = selector(state, "golfholes");
  const golfscores = selector(state, "golfscores");
  return {
    golfclub,
    golfdate,
    golfplayers,
    golfholes,
    golfscores,
    golfclubError: !!state.golfclub.error,
    loading: state.golfclub.loading,
    user: state.user
  }
})(CreateGolfRoundModal)


CreateGolfRoundModal = reduxForm({
  form: "createGolfRound",
  keepDirtyOnReinitialize: true,
  destroyOnUnmount: false,
  validate
})(CreateGolfRoundModal);

CreateGolfRoundModal = connect(state => ({
  initialValues: {
    golfdate: moment(new Date(Date.now()).setMinutes(0)).toDate(),
    golfplayers: [{
      playerName: state.user.username,
      playerHcp: state.user.hcp.value,
      playerGender: state.user.gender,
      playerTee: state.user.gender === "male" ? "Yellow" : "Red",
      hcpRound: false,
    }]
  }
}))(CreateGolfRoundModal)
export default CreateGolfRoundModal;
