import React, { Component } from "react";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { Button, Modal, Header, Grid, Form } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import { shownModal, setHcp } from "../../actions/users";


const validate = value => {
  const errors = {}
  if (!value.hcpInput) {
    errors.hcpInput = "Enter something"
  }
  if (isNaN(value.hcpInput)) {
    errors.hcpInput = "Must be a number";
  }
  if (value.hcpInput > 54 || value.hcpInput < -10) {
    errors.hcpInput = "Not a valid HCP"
  }
  return errors;
};

class CompleteSignupModal extends Component {
  state = {
    open: true,
    errors: {}
  };

  submitHcp = values => {
    this.props.setHcp(this.props.user, values.hcpInput);
    // .catch(err =>
    //     this.setState({
    //       errors: err.response.data.errors,
    //       loading: false
    //     }));
    const { errors } = this.state
    if (Object.keys(errors).length === 0) {
      this.props.user.hcp.sethcp = true;
      this.close();
    }
  }

  closeConfigShow = (closeOnEscape, closeOnRootNodeClick) => () => {
    this.setState({ closeOnEscape, closeOnRootNodeClick, open: true });
  };

  close = () => {
    this.props.shownModal();
    this.setState({ prompted: true, open: false })
  };


  HCPInput = ({ input }) => (
    <input
      value={input.value}
      onChange={input.onChange}
      style={
        {
          boxShadow: "#666666 0px 0px 8pt 5pt",
          color: "white",
          backgroundColor: "rgba(255,255,255,0.1)",
          width: "145pt",
          height: "40pt",
          fontSize: "30pt",
          textAlign: "center",
          marginTop: "12pt",
          marginBottom: "45pt",
          border: "none"
        }
      }
    />
  );

  render() {
    const { open, closeOnEscape, closeOnRootNodeClick } = this.state;
    const { handleSubmit, submitting, invalid } = this.props;
    return (
      <Modal
        style={{
          marginTop: "50px",
          marginLeft: "auto",
          marginRight: "auto"
        }}
        basic
        size="small"
        open={open}
        closeOnEscape={closeOnEscape}
        closeOnRootNodeClick={closeOnRootNodeClick}
        onClose={this.close}

      >
        <Modal.Content style={{ textAlign: "center" }}>
          <Grid>
            <Grid.Column>
              <Grid.Row>
                <Header style={{ marginBottom: "60px", fontSize: "60px" }} inverted>Welcome to Mulligan</Header>
              </Grid.Row>
              <Grid.Row>
                <h3>Enter your HCP</h3>
                <Form>
                  <Field name="hcpInput" component={this.HCPInput} />
                </Form>
              </Grid.Row>
              <Grid.Row>
                <div style={{ margin: "auto", display: "flex", flexDirection: "row", justifyContent: "space-evenly", width: "40%" }}>

                  <Button onClick={this.close} inverted color="orange">
                    Later...
            </Button>
                  <Button onClick={handleSubmit(this.submitHcp)} color="orange" disabled={submitting || invalid}>
                    Next
            </Button>
                </div>
              </Grid.Row>
            </Grid.Column>
          </Grid>
        </Modal.Content>
      </Modal>
    )
  }
}

CompleteSignupModal.propTypes = {
  setHcp: PropTypes.func.isRequired,
  shownModal: PropTypes.func.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
    hcp: PropTypes.shape({
      value: PropTypes.number.isRequired,
      sethcp: PropTypes.bool.isRequired,
    }),
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

/* eslint-disable-next-line */
CompleteSignupModal = connect(mapStateToProps, { setHcp, shownModal })(CompleteSignupModal)

export default reduxForm({
  form: "completeSignup", //        <------ same form name
  destroyOnUnmount: true, //        <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(CompleteSignupModal);
