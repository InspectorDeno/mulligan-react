import {
  WEATHER_DATA_REQUESTED,
  WEATHER_DATA_RETRIEVED,
  WEATHER_DATA_FAILED
} from "../types";

const initialState = {
  items: {},
  loading: false,
  errors: ""
};

export default function weather(state = initialState, action = {}) {
  switch (action.type) {
    case WEATHER_DATA_REQUESTED:
      return {
        ...state,
        loading: true,
        errors: ""
      };
    case WEATHER_DATA_RETRIEVED:
      return {
        ...state,
        loading: false,
        items: action.payload
        // bättre med action.payload.weatherData tror jag
      };
    case WEATHER_DATA_FAILED:
      return {
        ...state,
        loading: false,
        errors: action.errors,
        items: {}
        // för då finns kanske också action.payload.error
      };
    default:
      return state;
  }
}
