import { USER_LOGGED_IN, USER_LOGGED_OUT } from "../types";
import api from "../api";
import setAuthorizationHeader from "../utils/setAuthorizationHeader"

// ---------------- ACTIONS -----------------
export const userLoggedIn = user => ({
  type: USER_LOGGED_IN,
  user
});

export const userLoggedOut = () => ({
  type: USER_LOGGED_OUT
});


// ---------------- ACTION CREATORS -----------------

// ---------------- LOG IN -----------------
export const login = credentials => dispatch =>
  api.user.login(credentials).then(user => {
    localStorage.mulliganJWT = user.token;
    setAuthorizationHeader(localStorage.mulliganJWT);
    dispatch(userLoggedIn(user));
  });

// ---------------- LOG OUT -----------------
export const logout = () => dispatch => {
  localStorage.removeItem("mulliganJWT");
  dispatch(userLoggedOut());
};

// ---------------- VERIFY EMAIL -----------------
export const confirm = token => dispatch =>
  api.user.confirm(token).then(user => {
    localStorage.mulliganJWT = user.token;
    setAuthorizationHeader(localStorage.mulliganJWT);
    dispatch(userLoggedIn(user));
  });

// ---------------- ACTION CREATORS -----------------

export const resetPasswordRequest = ({ email }) => () =>
  api.user.resetPasswordRequest(email);

export const validateToken = token => () => api.user.validateToken(token);

export const resetPassword = data => () => api.user.resetPassword(data);
