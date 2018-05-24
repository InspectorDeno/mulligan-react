import api from "../api";
import {
  WEATHER_DATA_REQUESTED,
  WEATHER_DATA_RETRIEVED,
  WEATHER_DATA_FAILED
} from "../types";

// Thunk
export const getWeatherBegin = () => ({
  type: WEATHER_DATA_REQUESTED
});

export const getWeatherSuccess = weatherData => ({
  type: WEATHER_DATA_RETRIEVED,
  payload: weatherData
});

export const getWeatherError = error => ({
  type: WEATHER_DATA_FAILED,
  errors: error
});


export function getWeather() {
  return dispatch => {
    dispatch(getWeatherBegin());
    return api.weather.getCurrent()
      .then(weatherData =>
        dispatch(getWeatherSuccess(weatherData)))
      .catch(err => dispatch(getWeatherError(err.response.data.errors)));
  };
}
