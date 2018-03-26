import { USER_LOGGED_IN, USER_LOGGED_OUT } from "../types";
import api from "../api";

// Define our thunk action

export const userLoggedIn = user => ({
  type: USER_LOGGED_IN,
  user
});

export const userLoggedOut = () => ({
  type: USER_LOGGED_OUT
});

// This template is used for almost all api requests throughout this application
export const login = credentials => dispatch =>
  api.user.login(credentials).then(user => {
    localStorage.putterToken = user.token;
    dispatch(userLoggedIn(user));
  });

export const logout = () => dispatch => {
  localStorage.removeItem("putterToken");
  dispatch(userLoggedOut());
};
