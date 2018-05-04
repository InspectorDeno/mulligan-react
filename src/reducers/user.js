import {
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  USER_DATA_REQUESTED,
  USER_DATA_RETRIEVED,
  USER_DATA_FAILED,
  FRIEND_REQUEST_SENT,
  FRIEND_REQUEST_SUCCESS,
  FRIEND_REQUEST_FAILED,
  FRIEND_DATA_REQUESTED,
  FRIEND_DATA_RETRIEVED,
  FRIEND_DATA_FAILED
} from "../types";

const initialState = {
  users: [],
  loading: false,
  errors: {}
};

export default function user(state = initialState, action = {}) {
  switch (action.type) {
    case USER_LOGGED_IN:
      return action.user;
    case USER_LOGGED_OUT:
      return {};
    case USER_DATA_REQUESTED:
      return { ...state, loading: true, errors: {} };
    case USER_DATA_RETRIEVED:
      return { ...state, loading: false, users: action.payload };
    case USER_DATA_FAILED:
      return { ...state, loading: false, errors: action.payload, users: [] };
    case FRIEND_DATA_REQUESTED:
      return { ...state, loading: true, errors: {} };
    case FRIEND_DATA_RETRIEVED:
      return { ...state, loading: false, friends: action.payload.data };
    // bättre med action.payload.weatherData tror jag
    case FRIEND_DATA_FAILED:
      return { ...state, loading: false, errors: action.payload };
    // för då finns kanske också action.payload.error
    case FRIEND_REQUEST_SENT:
      return { ...state, loading: true, errors: {} };
    case FRIEND_REQUEST_SUCCESS:
      return { ...state, loading: false, errors: {} };
    case FRIEND_REQUEST_FAILED:
      return { ...state, loading: false, errors: action.payload };
    default:
      return state;
  }
}
