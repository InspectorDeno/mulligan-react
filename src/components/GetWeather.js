import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Button, Segment } from "semantic-ui-react";
import { getWeather } from "../actions/weatherAction";

class GetWeather extends Component {
  state = {
    weatherData: [],
    loading: false,
    error: ""
  };

  onGetWeather = () => {
    this.props.dispatch(getWeather());
  };

  render() {
    const { error, weatherData } = this.props;
    if (weatherData[0] !== undefined) {
      console.log(weatherData[0]);
    }

    if (error) {
      return <div>Error{error.error}</div>;
    }
    return (
      <div>
        <Button onClick={() => this.onGetWeather()} />
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
