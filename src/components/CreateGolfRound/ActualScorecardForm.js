import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from "redux-form";
import { Button } from 'semantic-ui-react';
import moment from "moment";
import RemoteSubmitButton from "./RemoteSubmitButton";
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import validate from "./validate";
import { loadFriend } from "../../actions/friends";

class ActualScorecardForm extends Component {
    constructor(props) {
        super(props)
        this.nextPage = this.nextPage.bind(this)
        this.previousPage = this.previousPage.bind(this)
        this.state = {
            page: 1
        }
    }
    // Keeps track on what page we're on
    nextPage() {
        this.setState({ page: this.state.page + 1 })
    }
    previousPage() {
        this.setState({ page: this.state.page - 1 })
    }

    // Insides of the modal with the wizard buttons
    render() {
        const { invalid, reset, submitting } = this.props;
        const { page } = this.state;
        return (
            <div>
                <form>

                    {page === 1 && <StepOne validate={validate} />}
                    {page === 2 && <StepTwo />}
                    {page === 3 && <StepThree />}

                    <button type="button" onClick={reset}>
                        Start over...
                    </button>
                </form>
                <div>
                    {page === 1 && <Button color="orange" onClick={this.nextPage} disabled={invalid || submitting}> Next </Button>}
                    {page === 2 &&
                        <div>
                            <Button color="orange" inverted onClick={this.previousPage}>
                                Previous
                            </Button>
                            <Button color="orange" onClick={this.nextPage} disabled={invalid || submitting}>
                                Next
                            </Button>
                        </div>
                    }
                    {page === 3 &&
                        <div>
                            <Button color="orange" inverted onClick={this.previousPage}>
                                Previous
                            </Button>
                            <Button color="orange" onClick={this.nextPage} disabled={invalid || submitting}>
                                Next
                            </Button>
                        </div>
                    }
                    {page === 4 &&
                        <div>
                            <Button color="orange" inverted onClick={this.previousPage}>
                                Previous
                            </Button>
                            <RemoteSubmitButton />
                        </div>
                    }
                </div>
            </div>
        )
    }
};

ActualScorecardForm.propTypes = {
    invalid: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,

}

export default reduxForm({
    form: "createGolfRound",
    initialValues: {
        golfdate: moment(new Date(Date.now()).setMinutes(0)).toDate(),
        golfplayers: [{ playerName: "Dennis", playerHcp: "11", playerGender: "Male", playerTee: "Red" }]
    },
    keepDirtyOnReinitialize: true,
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    validate
})(ActualScorecardForm);
