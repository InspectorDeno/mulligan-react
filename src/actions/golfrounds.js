import { PLAYER_ADDED, PLAYER_DELETED } from "../types";

export const addPlayer = playerObj => ({
  type: PLAYER_ADDED,
  player: playerObj
});
export const deletePlayer = playerObj => ({
  type: PLAYER_DELETED,
  player: playerObj
});
