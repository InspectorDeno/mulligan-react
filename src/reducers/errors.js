import { reject } from "underscore";
import {
  ADD_ERROR,
  REMOVE_ERROR
} from "../types";

export default function errors(state = [], action) {
  switch (action.type) {
    case ADD_ERROR:
      return state.concat(action.error);
    case REMOVE_ERROR:
      {
        const newState = reject(state, action.error);
        return newState;
      }
    default:
      return state;
  }
}