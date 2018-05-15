import api from "../api";
import { userLoggedIn } from "./auth";
import {
  USER_DATA_REQUESTED,
  USER_DATA_RETRIEVED,
  USER_DATA_FAILED,
  FRIEND_DATA_REQUESTED,
  FRIEND_DATA_RETRIEVED,
  FRIEND_DATA_FAILED,
  SET_HCP_BEGIN,
  SET_HCP_SUCCESS,
  SET_HCP_FAILED,
  SET_SHOW_COMPLETE_SIGNUP,
  PENDING_DATA_REQUESTED,
  PENDING_DATA_RETRIEVED,
  PENDING_DATA_FAILED,
  RESPOND_FRIEND_BEGIN,
  RESPOND_FRIEND_SUCCESS,
  RESPOND_FRIEND_FAILED,
  SUBMIT_SCORECARD_BEGIN,
  SUBMIT_SCORECARD_SUCCESS,
  SUBMIT_SCORECARD_FAILED
} from "../types";

// ---------------- FIND USER ----------------
export const findUserBegin = () => ({
  type: USER_DATA_REQUESTED
});

export const findUserSuccess = userData => ({
  type: USER_DATA_RETRIEVED,
  payload: userData
});

export const findUserError = error => ({
  type: USER_DATA_FAILED,
  errors: error.response.data.errors
});

// ---------------- GET FRIENDS ----------------
export const getFriendsBegin = () => ({
  type: FRIEND_DATA_REQUESTED
});

export const getFriendsSuccess = friendsData => ({
  type: FRIEND_DATA_RETRIEVED,
  payload: friendsData
});

export const getFriendsError = () => ({
  type: FRIEND_DATA_FAILED
});

// ---------------- SET HCP ----------------
export const setHcpBegin = hcp => ({
  type: SET_HCP_BEGIN,
  hcp
});

export const setHcpSuccess = () => ({
  type: SET_HCP_SUCCESS
});
export const setHcpError = error => ({
  type: SET_HCP_FAILED,
  errors: error.response.data.errors
});

// ---------------- GET PENDING FRIENDS ----------------

export const getPendingBegin = () => ({
  type: PENDING_DATA_REQUESTED
});

export const getPendingSuccess = pendingData => ({
  type: PENDING_DATA_RETRIEVED,
  payload: pendingData
});

export const getPendingError = error => ({
  type: PENDING_DATA_FAILED,
  errors: error
});

// ---------------- RESPOND TO FRIEND REQUEST ----------------
export const respondFriendRequestBegin = () => ({
  type: RESPOND_FRIEND_BEGIN
});

export const respondFriendRequestSuccess = userData => ({
  type: RESPOND_FRIEND_SUCCESS,
  payload: userData
});

export const respondFriendRequestError = error => ({
  type: RESPOND_FRIEND_FAILED,
  errors: error
});

// ---------------- SHOW SIGNUP MODAL ----------------
export const setShowCompleteSignup = () => ({
  type: SET_SHOW_COMPLETE_SIGNUP
});

// ---------------- SUBMIT SCORECARD ----------------

export const submitScorecardBegin = () => ({
  type: SUBMIT_SCORECARD_BEGIN
});

export const submitScorecardSuccess = data => ({
  type: SUBMIT_SCORECARD_SUCCESS,
  payload: data
});

export const submitScorecardError = error => ({
  type: SUBMIT_SCORECARD_FAILED,
  errors: error
});

// ********************************** API CALLS **********************************
export const signup = data => dispatch =>
  api.user.signup(data).then(user => {
    localStorage.mulliganJWT = user.token;
    dispatch(userLoggedIn(user));
  });

// For finding a user in the database
export function findUser(user) {
  return dispatch => {
    dispatch(findUserBegin());
    return api.user
      .findUser(user)
      .then(userData => dispatch(findUserSuccess(userData)))
      .catch(err => {
        dispatch(findUserError(err));
      });
  };
}

// For fetching friends
export function getFriends() {
  return dispatch => {
    dispatch(getFriendsBegin());
    return api.user
      .getFriends()
      .then(data => {
        dispatch(getFriendsSuccess(data));
      })
      .catch(err => {
        // dispatch(addError(err.response.data.errors));
        dispatch(getFriendsError(err.response.data.errors));
      });
  };
}

// For fetching pending friends
export function getPending() {
  return dispatch => {
    dispatch(getPendingBegin());
    return api.user
      .getPending()
      .then(data => dispatch(getPendingSuccess(data)))
      .catch(err => {
        dispatch(getPendingError(err.response.data.errors));
      });
  };
}

export const setHcp = (hcp) => dispatch => {
  dispatch(setHcpBegin());
  api.user.setHcp(hcp).then(updatedUser => {
    localStorage.mulliganJWT = updatedUser.token;
    dispatch(setHcpSuccess());
  });
};

export const respondFriendRequest = (friend, response) => dispatch => {
  dispatch(respondFriendRequestBegin());
  api.user.respondFriendship(friend, response).then(respondData => {
    dispatch(respondFriendRequestSuccess(respondData));
    dispatch(getFriends());
  })
}

export const shownModal = () => dispatch => dispatch(setShowCompleteSignup());

export function submitScorecard(data) {
  return dispatch => {
    dispatch({ type: SUBMIT_SCORECARD_BEGIN });
    return api.user.submitScorecard(data)
      .then(res => dispatch(submitScorecardSuccess(res)))
      .catch(err => {
        dispatch(submitScorecardError(err));
      });
  };
}