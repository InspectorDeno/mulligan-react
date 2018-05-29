import React from "react";
import PropTypes from "prop-types";
import { Header, Loader, Grid } from "semantic-ui-react";
import moment from "moment";
import { isEmpty } from "underscore"
import "../../assets/weather-icons/css/weather-icons.css";
import "../../assets/weather-icons/css/weather-icons-wind.min.css";
import setWeatherIcon from "../mapWeatherToSymbol";

const RenderCurrentWeather = ({ data, error }) => {

  const currently = data.currently;

  const date = moment().format("dddd, HH:mm")
  const symbol = setWeatherIcon(currently);
  const windDir = `wi wi-wind from-${currently.windBearing}-deg`;
  const windSpeed = currently.windSpeed;
  const precip = currently.precipIntensity
  return (

    <div style={{ display: "flex", flexDirection: "column", color: "#fbbd08" }}>
      <Header style={{ color: "white", fontSize: "3em" }}>
        Golf weather?
      </Header>
      <Header as="h1" style={{ color: "#fbbd08" }}>
        {date}
      </Header>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", paddingRight: "25px", justifyContent: "space-between" }}>
          <div className={error ? "wi wi-refresh" : symbol} style={{ float: "left", fontSize: "105px" }} />
          <div style={{ color: "white", fontSize: "20px" }}>
            {currently.summary}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", width: "130px" }}>
          <div style={{ display: "flex", float: "right", marginBottom: "10px" }}>
            <div style={{ fontSize: "80px", lineHeight: "80px", color: "white" }}>
              {Math.round(currently.temperature)}
            </div>
            <div style={{ fontSize: "36px", lineHeight: "80px", margin: "-10px 0 0 5px", color: "white" }}>
              &deg;C
          </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-around", fontSize: "20px", lineHeight: "20px" }}>
            <i className={windDir} style={{ fontSize: "23px" }} />
            {windSpeed} m/s
          </div>
          <div style={{ display: "flex", justifyContent: "space-around", fontSize: "20px", lineHeight: "20px" }}>
            <i className={"wi wi-raindrops"} style={{ fontSize: "23px" }} />
            {precip} mm
          </div>
        </div>
      </div>
    </div>
  );
};

const RenderDaily = ({ data, hour }) => {

  const startTime = moment('04:00', "HH:mm");
  const endTime = moment('21:00', "HH:mm");

  const theHour = moment.unix(hour.time, "HH:mm");
  if (moment(theHour).isBetween(startTime, endTime)) {
    const symbol = setWeatherIcon(hour);
    return (
      <Grid.Column style={{ padding: 0 }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center", margin: 0 }}>
          <div style={{ marginBottom: "13px", background: "#fbbd08" }}>{theHour.format("HH:mm")}</div>
          <i className={symbol} style={{ fontSize: "3em", lineHeight: "1em", color: "#26243c" }} />
          <div style={{ color: "#26243c" }}>{Math.round(hour.temperature)}&deg;C</div>
        </div>
      </Grid.Column>
    )
  }
  return ""
}


export const CurrentWeather = props => {
  const { errors, weatherData } = props;
  return (
    <div>
      {isEmpty(weatherData) ?
        <Loader inverted active indeterminate>
          Fetching Weather Data...
              </Loader>
        : <RenderCurrentWeather data={weatherData} error={errors} />
      }
    </div>
  );
};

export const DailyWeather = props => {
  const { weatherData } = props;
  return (
    <div>
      {!isEmpty(weatherData) &&
        <div>
          <Grid style={{ margin: 0 }}>
            {weatherData.hourly.data.map(hour => <RenderDaily data={weatherData} hour={hour} />)}
          </Grid>
        </div>
      }
    </div>
  );
};


CurrentWeather.propTypes = {
  errors: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  weatherData: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    error: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
  }),
};

CurrentWeather.defaultProps = {
  weatherData: {}
}
