import { USER_LOGGED_IN } from "../types";
import api from "../api";

// Define our thunk action

export const userLoggedIn = user => ({
  type: USER_LOGGED_IN,
  user
});

// This template is used for almost all api requests throughout this application
export const login = credentials => dispatch =>
  api.user.login(credentials).then(user => dispatch(userLoggedIn(user)));
