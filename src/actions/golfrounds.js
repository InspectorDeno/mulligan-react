import { LOAD_PLAYER } from "../types";

export const load = player => ({
  type: LOAD_PLAYER,
  data: player
});

export const loadPlayer = player => dispatch => dispatch(load(player));
