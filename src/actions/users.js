import api from "../api";
import { userLoggedIn } from "./auth";
import {
  USER_DATA_REQUESTED,
  USER_DATA_RETRIEVED,
  USER_DATA_FAILED,
  FRIEND_DATA_REQUESTED,
  FRIEND_DATA_RETRIEVED,
  FRIEND_DATA_FAILED
} from "../types";

// Find User Thunk
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

// Get Friends Thunk
export const getFriendsBegin = () => ({
  type: FRIEND_DATA_REQUESTED
});

export const getFriendsSuccess = friendsData => ({
  type: FRIEND_DATA_RETRIEVED,
  payload: friendsData
});

export const getFriendsError = error => ({
  type: FRIEND_DATA_FAILED,
  payload: error.response.data.errors
});

// API calls
export const signup = data => dispatch =>
  api.user.signup(data).then(user => {
    localStorage.mulliganJWT = user.token;
    dispatch(userLoggedIn(user));
  });

// For finding a user in the database
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

// For fetching friends
export function getFriends(user) {
  return dispatch => {
    dispatch(getFriendsBegin());
    return api.user
      .getFriends(user)
      .then(data => {
        dispatch(getFriendsSuccess(data));
      })
      .catch(error => {
        console.log(error);
        dispatch(getFriendsError(error));
      });
  };
}
