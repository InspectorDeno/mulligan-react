import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Divider, Segment, Header, Container } from "semantic-ui-react";
import CreateGolfRoundModal from "../modals/CreateGolfRoundModal";
import { addScorecard } from "../../actions/users";
import GolfroundsList from "../GolfRoundComponents/GolfroundsList";
import header from "../../assets/images/titleist.png";

class GolfRoundsPage extends PureComponent {
  submit = data => {
    this.props.dispatch(addScorecard(data));
  };
  PageHeader = () => (
    <div style={{ marginBottom: "30px" }}>
      <img
        src={header}
        alt="logo"
        style={{ width: "100%", boxShadow: "0 0 11px 0" }}
      />
      <Segment
        compact
        style={{
          marginTop: "-60px",
          border: "none",
          textAlign: "center",
          background: "rgb(255,255,255)",
          marginLeft: "50px",
          boxShadow: "none",
          borderRadius: "20px"
        }}
      >
        <Header
          style={{
            fontSize: "4em",
            fontWeight: "normal",
            padding: "20px",
            fontFamily: "Ananda",
            color: "#1e002d"
          }}
        >
          Golf Rounds
        </Header>
      </Segment>
    </div>
  );

  render() {
    return (
      <div>
        <this.PageHeader />
        <Container>
          <div style={{ textAlign: "center" }}>
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
