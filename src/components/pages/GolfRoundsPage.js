import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Divider, Segment, Header, Container } from "semantic-ui-react";
import CreateGolfRoundModal from "../modals/CreateGolfRoundModal";
import { addScorecard } from "../../actions/users";
import GolfroundsList from "../GolfRoundComponents/GolfroundsList";

class GolfRoundsPage extends PureComponent {
  submit = data => {
    this.props.dispatch(addScorecard(data));
  };
  PageHeader = () => (
    <Segment
      vertical
      textAlign="center"
      style={{
        minHeight: 200,
        padding: "1em 0em ",
        background:
          "linear-gradient(154deg, #1e002d, #1e002d,#1e002d, #b5cc18)",
        border: "none",
        marginBottom: "4em"
      }}
    >
      <Header
        inverted
        style={{
          fontSize: "4em",
          fontWeight: "normal",
          marginTop: "1em"
        }}
      >
        Golf Rounds
      </Header>
    </Segment>
  );
  render() {
    return (
      <div>
        <this.PageHeader />
        <Container>
          <div style={{ textAlign: "center" }}>
            <Divider hidden />
            <CreateGolfRoundModal onSubmit={this.submit} />
            <Divider hidden />
          </div>
          <GolfroundsList />
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

GolfRoundsPage.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(GolfRoundsPage);
