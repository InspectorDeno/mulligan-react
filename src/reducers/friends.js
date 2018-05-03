import {
  FRIEND_DATA_REQUESTED,
  FRIEND_DATA_RETRIEVED,
  FRIEND_DATA_FAILED
} from "../types";

const initialState = {
  items: [],
  loading: false,
  errors: {}
};

export default function friends(state = initialState, action = {}) {
  switch (action.type) {
    case FRIEND_DATA_REQUESTED:
      return {
        ...state,
        loading: true,
        errors: {}
      };
    case FRIEND_DATA_RETRIEVED:
      return {
        ...state,
        loading: false,
        items: action.payload.friendData
        // bättre med action.payload.weatherData tror jag
      };
    case FRIEND_DATA_FAILED:
      return {
        ...state,
        loading: false,
        errors: action.payload
        // för då finns kanske också action.payload.error
      };
    default:
      return state;
  }
}
