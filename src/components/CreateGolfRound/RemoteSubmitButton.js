import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { submit } from 'redux-form'
import { button, Button } from 'semantic-ui-react';


const RemoteSubmitButton = ({ dispatch }) => (
    <Button positive onClick={() => dispatch(submit('createGolfRound'))}> All done </Button>
)

RemoteSubmitButton.propTypes = {
    dispatch: PropTypes.func.isRequired,
}

export default connect()(RemoteSubmitButton)
