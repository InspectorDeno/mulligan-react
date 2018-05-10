import { LOAD_PLAYER } from "../types";

export default function golfrounds(state = {}, action) {
  switch (action.type) {
    case LOAD_PLAYER:
      return {
        data: action.data
      };
    default:
      return state;
  }
}
