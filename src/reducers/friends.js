import { LOAD_FRIEND_GOLFROUND, UNLOAD_FRIEND_GOLFROUND } from "../types";

const initialState = {
  data: [],
  loading: false,
  errors: {}
};

export default function friends(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_FRIEND_GOLFROUND:
      return { data: action.data }
    case UNLOAD_FRIEND_GOLFROUND:
      return { data: action.data }
    default:
      return state;
  }
}
