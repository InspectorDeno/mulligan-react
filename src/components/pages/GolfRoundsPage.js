import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Grid, Segment, Header, Container } from "semantic-ui-react";
import CreateGolfRoundModal from "../modals/CreateGolfRoundModal";
import { addScorecard } from "../../actions/users";
import GolfroundsList from "../GolfRoundComponents/GolfroundsList";
import header from "../../assets/images/titleist.png";

class GolfRoundsPage extends PureComponent {
  submit = data => {
    this.props.dispatch(addScorecard(data));
  };
  PageHeader = () => (
    <div>
      <Segment
        vertical
        style={{
          maxHeight: 680,
          background: "#1e002d",
          border: "none",
          zIndex: 1
        }}
      >
        <img
          src={header}
          alt="logo"
          style={{ width: "100%", boxShadow: "0 0 11px 0", zIndex: 2 }}
        />

        <Segment
          compact
          style={{
            margin: "-60px 0 0 50px",
            border: "none",
            textAlign: "center",
            background: "#1e002d",
            boxShadow: "none",
            borderRadius: "20px",
            zIndex: 3
          }}
        >
          <Header
            style={{
              fontSize: "4em",
              fontWeight: "normal",
              padding: "20px",
              fontFamily: "Ananda",
              color: "white"
            }}
          >
            Golf Rounds
        </Header>
        </Segment>
        <Grid >
          <Grid.Column width={8}>
            <div style={{ color: "white", fontSize: "1em", lineHeight: "1.2em", padding: "0 0 10px 50px" }}>
              {"This is where all your registered golf rounds are kept"}<br />
              {"They contain the scorecard for you and your friends that shows how well you did out there"}<br />
              {"The rounds also come with some more detailed statistics, depending on how much information you wish to fill in"}<br />
            </div>
          </Grid.Column>
          <Grid.Column width={6} textAlign="center" verticalAlign="middle" style={{ zIndex: "4" }}>
            <CreateGolfRoundModal onSubmit={this.submit} />
          </Grid.Column>
          <Grid.Column width={2} />
        </Grid>
      </Segment>
    </div>
  );

  render() {
    return (
      <div>
        <this.PageHeader />
        <Container>
          <GolfroundsList />
        </Container>
      </div >
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
