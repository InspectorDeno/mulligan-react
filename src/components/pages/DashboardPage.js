import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { isEmpty } from "underscore"
import { Header, Container, Segment, Divider } from "semantic-ui-react";
import { DailyWeather, CurrentWeather } from "../Weather/CurrentWeather";
import CompleteSignupModal from "../modals/CompleteSignupModal";
import { getWeather } from "../../actions/weatherAction";


class DashboardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    if (isEmpty(this.props.weatherData)) {
      this.props
        .dispatch(getWeather());
    }
  }

  PageHeader = () => (
    <div>
      <Segment
        vertical
        textAlign="center"
        style={{
          minHeight: 300,
          padding: "1em 0em ",
          background:
            "linear-gradient(154deg, #1e002d, #1e002d, #1e002d, darkslategray)",
          border: "none",
          boxShadow: "0 0 11px 0",
          zIndex: "1",
        }}
      >
        <Header style={{
          fontSize: "7em",
          fontFamily: "Ananda",
          color: "#fbbd08",
          margin: "100px auto 0 auto"
        }}>
          Mulligan
        </Header>
      </Segment>
    </div>
  );

  RenderWeather = () => (
    <div>
      <Segment
        vertical
        textAlign="center"
        style={{
          minHeight: 360,
          padding: "1em 0em ",
          background: "#1e002d",
          border: "none",
          zIndex: "1",
          width: "45em"
        }}
      >
        <CurrentWeather weatherData={this.props.weatherData} errors={this.props.errors} />
      </Segment>
    </div>
  )

  render() {
    const { user } = this.props;
    return (
      <div>
        {!user.hcp.sethcp && !user.shownModal && <CompleteSignupModal />}
        <this.PageHeader />
        <div style={{ display: "flex", minHeight: 360 }}>
          <this.RenderWeather />
          <div style={{ padding: "30px" }}>
            <Header style={{ fontSize: "3em" }}>
              Welcome {user.username}!
            </Header>
            <div style={{ fontSize: "1.2em", lineHeight: "1.6em" }}>
              Good to see you!<br />
              {"Did you register any golf rounds yet?"}<br />
              {"It's a great way to keep track of your scores and your progress!"}<br />
            </div>
          </div>
        </div>
        <DailyWeather weatherData={this.props.weatherData} />
      </div>
    );
  }
}

DashboardPage.propTypes = {
  // isConfirmed: PropTypes.bool.isRequired
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    hcp: PropTypes.shape({
      value: PropTypes.number.isRequired,
      sethcp: PropTypes.bool.isRequired
    }).isRequired,
    shownModal: PropTypes.bool
  }).isRequired,
  errors: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  weatherData: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    error: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
  })
};

DashboardPage.defaultProps = {
  shownModal: false,
  weatherData: {}
};

function mapStateToProps(state) {
  return {
    user: state.user,
    weatherData: state.weather.items,
    loading: state.weather.loading,
    errors: state.weather.errors
  };
}

export default connect(mapStateToProps)(DashboardPage);
