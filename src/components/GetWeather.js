import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Segment, Item, Loader, Message } from "semantic-ui-react";
import moment from "moment";
import { isEmpty } from "underscore"
import "weather-icons/css/weather-icons.css";
// import "weather-icons/css/weather-icons-wind.css";
import { getWeather } from "../actions/weatherAction";
import setWeatherIcon from "./mapWeatherToSymbol";

const RenderData = ({ data, error }) => {

  const currently = data.currently;

  const date = moment().format("dddd, HH:mm")
  const symbol = setWeatherIcon(currently);
  const windDir = `wi wi-wind from-${currently.windBearing}-deg`;
  const windSpeed = currently.windSpeed;
  return (

    <Item.Group divided>
      <h3> {date} </h3>
      <Item>
        {currently.summary}
        <div
          className={error ? "wi wi-refresh" : symbol}
          style={{
            color: "#1471a9",
            fontSize: "120px",
            margin: "20px"
          }}
        />
        <Item.Content>
          <Item.Extra style={{ padding: "15px 0" }}>
            <span
              style={{
                float: "left",
                fontSize: "80px",
                margin: "10px 0 25px 0",
                color: "#1471a9"
              }}
            >
              {Math.round(currently.temperature)}
            </span>
            <div
              style={{
                float: "left",
                margin: "0",
                fontSize: "30px",
                color: "#1471a9"
              }}
            >
              &deg;C
            </div>
          </Item.Extra>
          <Item.Extra style={{ margin: "0" }}>
            <div
              className={windDir}
              style={{ fontSize: "25px", margin: "auto" }}
            />
            <span style={{ marginLeft: "10px" }}>{windSpeed} m/s</span>
          </Item.Extra>
          <Item.Extra style={{ margin: "0" }}>
            <div
              className="wi wi-raindrops"
              style={{ fontSize: "25px", margin: "auto" }}
            />
          </Item.Extra>
        </Item.Content>
      </Item>
    </Item.Group>
  );
};

class GetWeather extends Component {
  state = {};

  componentWillMount() {
    if (isEmpty(this.props.weatherData)) {
      console.log("fetching...");
      this.props
        .dispatch(getWeather());
    }
  }
  render() {
    const { errors, weatherData } = this.props;

    if (errors) {
      return <Message error>{errors}</Message>;
    }
    return (
      <div>
        {isEmpty(weatherData) ?
          <Loader active indeterminate>
            Fetching Weather Data...
              </Loader>
          : <RenderData data={weatherData} error={errors} />
        }
      </div>
    );
  }
}

GetWeather.propTypes = {
  errors: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  weatherData: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    error: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
  }),
};

GetWeather.defaultProps = {
  weatherData: {}
}

function mapStateToProps(state) {
  return {
    weatherData: state.weather.items,
    loading: state.weather.loading,
    errors: state.weather.errors
  };
}
export default connect(mapStateToProps)(GetWeather);
