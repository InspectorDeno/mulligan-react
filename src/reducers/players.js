import { PLAYER_ADDED, PLAYER_DELETED } from "../types";

const initialState = {
  players: []
};

function returnNameObj(name) {
  return {
    name
  };
}

export default function players(state = initialState, action = {}) {
  switch (action.type) {
    case PLAYER_ADDED:
      return {
        ...state,
        players: [...state.players, Object.assign({}, action.player)]
      };
    case PLAYER_DELETED: {
      const newState = Object.assign([], state);
      const indexOfPlayerToDelete = state.findIndex(
        player => player.id === action.player.id
      );
      newState.splice(indexOfPlayerToDelete, 1);
      return newState;
    }
    default:
      return state;
  }
}
