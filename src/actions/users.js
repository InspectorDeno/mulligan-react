import api from "../api";
import { userLoggedIn } from "./auth";
import {
  USER_DATA_REQUESTED,
  USER_DATA_RETRIEVED,
  USER_DATA_FAILED
} from "../types";

// Thunk
export const getFindUserBegin = () => ({
  type: USER_DATA_REQUESTED
});

export const getFindUserSuccess = userData => ({
  type: USER_DATA_RETRIEVED,
  payload: userData
});

export const getFindUserError = error => ({
  type: USER_DATA_FAILED,
  payload: error.response.data.errors
});

// API Calls
export const signup = data => dispatch =>
  api.user.signup(data).then(user => {
    localStorage.mulliganJWT = user.token;
    dispatch(userLoggedIn(user));
  });

export function findUser(user) {
  return dispatch => {
    dispatch(getFindUserBegin());
    return api.user
      .findUser(user)
      .then(userData => dispatch(getFindUserSuccess(userData)))
      .catch(error => {
        dispatch(getFindUserError(error));
      });
  };
}
