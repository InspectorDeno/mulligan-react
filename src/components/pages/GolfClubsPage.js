import React, { Component } from "react";
import { Segment, Header, Container } from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getGolfClub } from "../../actions/golfclubs";
import header from "../../assets/images/titleist.png";


class GolfClubsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      golfClubData: [],
      loading: false,
      error: ""
    };
  }

  componentDidMount() {
    this.props
      .dispatch(getGolfClub("Linköpings Golfklubb"))
      .then(res => this.setState({ golfClubData: res.golfClubData }));
  }

  PageHeader = () => (
    <div style={{ marginBottom: "30px" }}>
      <img src={header} alt="logo" style={{ width: "100%", boxShadow: "0 0 11px 0" }} />
      <Segment compact style={{
        marginTop: "-60px",
        border: "none",
        textAlign: "center",
        background: "rgb(255,255,255)",
        marginLeft: "40px",
        boxShadow: "none",
        borderRadius: "20px"
      }}>
        <Header style={{
          fontSize: "4em",
          fontWeight: "normal",
          padding: "20px",
          fontFamily: "Ananda",
          color: "#1e002d"
        }}>
          Golf Clubs
     </Header>
      </Segment>
    </div>
  );

  render() {
    const { error, golfClubData } = this.props;

    return (
      <div>
        <this.PageHeader />
        <Container>
          <Segment>
            <div>Finding Linköpings Golfklubb</div>
            <span>{error}</span>
            <span>{golfClubData.length > 0 && golfClubData[0].club}</span>
          </Segment>
        </Container>
      </div>
    );
  }
}

GolfClubsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  golfClubData: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired
};

GolfClubsPage.defaultProps = {
  golfClubData: []
};

function mapStateToProps(state) {
  return {
    golfClubData: state.golfclub.items,
    loading: state.golfclub.loading,
    error: state.golfclub.error
  };
}

export default connect(mapStateToProps)(GolfClubsPage);
