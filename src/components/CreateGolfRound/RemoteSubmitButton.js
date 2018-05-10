import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { submit } from 'redux-form'
import { Button } from 'semantic-ui-react';


const RemoteSubmitButton = ({ disabled, dispatch }) => (
    <Button size="huge" color="orange" disabled={disabled} onClick={() => dispatch(submit('createGolfRound'))}> All done </Button>
)
RemoteSubmitButton.propTypes = {
    dispatch: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
}

export default connect()(RemoteSubmitButton)
