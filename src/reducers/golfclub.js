import {
  GOLFCLUB_DATA_REQUESTED,
  GOLFCLUB_DATA_RETRIEVED,
  GOLFCLUB_DATA_FAILED
} from "../types";

const initialState = {
  items: [],
  loading: false,
  error: ""
};

export default function golfclub(state = initialState, action = {}) {
  switch (action.type) {
    case GOLFCLUB_DATA_REQUESTED:
      return {
        ...state,
        loading: true,
        error: ""
      };
    case GOLFCLUB_DATA_RETRIEVED:
      return {
        ...state,
        loading: false,
        items: action.payload
      };
    case GOLFCLUB_DATA_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
        items: []
      };
    default:
      return state;
  }
}
