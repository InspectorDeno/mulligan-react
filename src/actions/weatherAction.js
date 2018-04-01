// import api from "../api";
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
  payload: error
});

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export function getWeather() {
  return dispatch => {
    dispatch(getWeatherBegin());
    return fetch("/api/weather/search")
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(getWeatherSuccess(json));
        return json.weatherData;
      });
  };
}
