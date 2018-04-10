import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Segment, Item } from "semantic-ui-react";
import Moment from "react-moment";
import "weather-icons/css/weather-icons.css";
import "weather-icons/css/weather-icons-wind.css";
import { getWeather } from "../actions/weatherAction";
import { setWeatherIcon } from "./mapWeatherToSymbol";

class GetWeather extends Component {
  state = {
    weatherData: [],
    loading: false,
    error: ""
  };

  componentWillMount() {
    this.props
      .dispatch(getWeather())
      .then(res => this.setState({ weatherData: res.items }));
  }

  renderData = props => {
    const data = props.weatherData;
    if (!data.length) {
      return <span>Loading data ... </span>;
    }

    const date = data[0].validTime;
    const temp = Math.round(data[0].degrees);
    const symbol = setWeatherIcon(data[0].symbol);
    const windDir = `wi wi-wind from-${data[0].windDir}-deg`;
    const windSpeed = data[0].windSpeed;
    const precepAmount = data[0].precMean;
    // const date = data.filter(entry => entry.validTime);
    return (
      // Icon

      <Item.Group divided>
        <h3>
          <Moment
            format="dddd, HH:mm"
            date={date}
            style={{ fontSize: "25px" }}
          />
        </h3>
        <Item>
          <div
            className={this.props.error ? "wi wi-refresh" : symbol}
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
                {temp}
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
              <span style={{ marginLeft: "10px" }}>{precepAmount} mm</span>
            </Item.Extra>
          </Item.Content>
        </Item>
      </Item.Group>
    );
  };

  render() {
    const { error, weatherData } = this.props;

    if (error) {
      return <div>Error{error.error}</div>;
    }
    return (
      <div>
        <Segment>
          <this.renderData weatherData={weatherData} />
        </Segment>
        <Segment>
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h3>Weather At Time</h3>
              <li>{weatherData[0] && weatherData[0].validTime}</li>
              <li>{weatherData[1] && weatherData[1].validTime}</li>
              <li>{weatherData[2] && weatherData[2].validTime}</li>
              <li>{weatherData[3] && weatherData[3].validTime}</li>
              <li>{weatherData[4] && weatherData[4].validTime}</li>
              <li>{weatherData[5] && weatherData[5].validTime}</li>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h3>Temperature</h3>
              <li>{weatherData[0] && weatherData[0].degrees}</li>
              <li>{weatherData[1] && weatherData[1].degrees}</li>
              <li>{weatherData[2] && weatherData[2].degrees}</li>
              <li>{weatherData[3] && weatherData[3].degrees}</li>
              <li>{weatherData[4] && weatherData[4].degrees}</li>
              <li>{weatherData[5] && weatherData[5].degrees}</li>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h3>Wind Speed</h3>
              <li>{weatherData[0] && weatherData[0].windSpeed}</li>
              <li>{weatherData[1] && weatherData[1].windSpeed}</li>
              <li>{weatherData[2] && weatherData[2].windSpeed}</li>
              <li>{weatherData[3] && weatherData[3].windSpeed}</li>
              <li>{weatherData[4] && weatherData[4].windSpeed}</li>
              <li>{weatherData[5] && weatherData[5].windSpeed}</li>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h3>Wind Direction</h3>
              <li>{weatherData[0] && weatherData[0].windDir}</li>
              <li>{weatherData[1] && weatherData[1].windDir}</li>
              <li>{weatherData[2] && weatherData[2].windDir}</li>
              <li>{weatherData[3] && weatherData[3].windDir}</li>
              <li>{weatherData[4] && weatherData[4].windDir}</li>
              <li>{weatherData[5] && weatherData[5].windDir}</li>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h3>Precipitation</h3>
              <li>{weatherData[0] && weatherData[0].precMean}</li>
              <li>{weatherData[1] && weatherData[1].precMean}</li>
              <li>{weatherData[2] && weatherData[2].precMean}</li>
              <li>{weatherData[3] && weatherData[3].precMean}</li>
              <li>{weatherData[4] && weatherData[4].precMean}</li>
              <li>{weatherData[5] && weatherData[5].precMean}</li>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h3>Symbol</h3>
              <li>{weatherData[0] && weatherData[0].symbol}</li>
              <li>{weatherData[1] && weatherData[1].symbol}</li>
              <li>{weatherData[2] && weatherData[2].symbol}</li>
              <li>{weatherData[3] && weatherData[3].symbol}</li>
              <li>{weatherData[4] && weatherData[4].symbol}</li>
              <li>{weatherData[5] && weatherData[5].symbol}</li>
            </div>
          </div>
        </Segment>
      </div>
    );
  }
}

GetWeather.propTypes = {
  error: PropTypes.string.isRequired,
  weatherData: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    weatherData: state.weather.items,
    loading: state.weather.loading,
    error: state.weather.error
  };
}
export default connect(mapStateToProps)(GetWeather);
