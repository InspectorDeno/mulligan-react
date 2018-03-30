import { INCREMENT, DECREMENT } from "../types";

// Thunk action
export const nextPage = page => ({
  type: INCREMENT,
  page
});

export const prevPage = page => ({
  type: DECREMENT,
  page
});

export const increment = page => dispatch => {
  dispatch(nextPage(page));
};

export const decrement = page => dispatch => {
  dispatch(prevPage(page));
};
