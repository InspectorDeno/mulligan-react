import {
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  USER_DATA_REQUESTED,
  USER_DATA_RETRIEVED,
  USER_DATA_FAILED,
  FRIEND_REQUEST_SENT,
  FRIEND_REQUEST_SUCCESS,
  FRIEND_REQUEST_FAILED
} from "../types";

const initialState = {
  items: [],
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
      return { ...state, loading: false, items: action.payload };
    case USER_DATA_FAILED:
      return {
        ...state,
        loading: false,
        errors: action.payload,
        items: []
      };
    case FRIEND_REQUEST_SENT:
      return { ...state, loading: true, errors: {} };
    case FRIEND_REQUEST_SUCCESS:
      return { ...state, loading: false, errors: {} };
    case FRIEND_REQUEST_FAILED:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };
    default:
      return state;
  }
}
