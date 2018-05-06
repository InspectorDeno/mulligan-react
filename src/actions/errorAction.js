import { ADD_ERROR, REMOVE_ERROR } from "../types";

export const errorAdded = err => ({
  type: ADD_ERROR,
  error: err
});

export const errorRemoved = err => ({
  type: REMOVE_ERROR,
  error: err
});

export const addError = error => dispatch => dispatch(errorAdded(error));
export const removeError = error => dispatch => dispatch(errorRemoved(error));
