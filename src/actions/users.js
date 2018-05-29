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
  ADD_SCORECARD_BEGIN,
  ADD_SCORECARD_SUCCESS,
  ADD_SCORECARD_FAILED,
  SCORECARD_DATA_REQUESTED,
  SCORECARD_DATA_RETRIEVED,
  SCORECARD_DATA_FAILED,
  CHANGE_PASSWORD_BEGIN,
  CHANGE_PASSWORD_SUCCESS
} from "../types";

// ---------------- ACTIONS -----------------

// ----------------CHANGE PASSWORD-----------------
export const changePasswordBegin = () => ({
  type: CHANGE_PASSWORD_BEGIN
});

export const changePasswordSuccess = () => ({
  type: CHANGE_PASSWORD_SUCCESS
});
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

export const setHcpSuccess = userData => ({
  type: SET_HCP_SUCCESS,
  payload: userData
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

// ---------------- ADD A SCORECARD ----------------

export const addScorecardBegin = () => ({
  type: ADD_SCORECARD_BEGIN
});

export const addScorecardSuccess = data => ({
  type: ADD_SCORECARD_SUCCESS,
  payload: data
});

export const addScorecardError = error => ({
  type: ADD_SCORECARD_FAILED,
  errors: error
});
// ---------------- GET SCORECARDS ----------------

export const getScorecardsBegin = () => ({
  type: SCORECARD_DATA_REQUESTED
});

export const getScorecardsSuccess = data => ({
  type: SCORECARD_DATA_RETRIEVED,
  payload: data
});

export const getScorecardsError = error => ({
  type: SCORECARD_DATA_FAILED,
  errors: error
});


// ---------------- ACTION CREATORS -----------------
// ---------------- SIGN UP -----------------
export const signup = data => dispatch =>
  api.user.signup(data).then(user => {
    localStorage.mulliganJWT = user.token;
    dispatch(userLoggedIn(user));
  });

// ---------------- CHANGE PASSWORD -----------------
export function changePassword(newPassword) {
  return dispatch => {
    dispatch(changePasswordBegin());
    return api.user
      .changePassword(newPassword)
      .then(() => dispatch(changePasswordSuccess()));
  };
}

// ---------------- FIND USERS -----------------
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

// ---------------- GET FRIENDS -----------------
export function getFriends() {
  return dispatch => {
    dispatch(getFriendsBegin());
    return api.user
      .getFriends()
      .then(data => {
        dispatch(getFriendsSuccess(data));
      })
      .catch(err => {
        dispatch(getFriendsError(err.response.data.errors));
      });
  };
}

// ---------------- GET PENDING FRIENDS -----------------
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

// ---------------- UPDATE HCP -----------------
export const setHcp = hcp => dispatch => {
  dispatch(setHcpBegin());
  api.user.setHcp(hcp).then(updatedUser => {
    localStorage.mulliganJWT = updatedUser.token;
    dispatch(setHcpSuccess(updatedUser));
  });
};

// ---------------- RESPOND TO FRIEND REQUEST -----------------
export const respondFriendRequest = (friend, response) => dispatch => {
  dispatch(respondFriendRequestBegin());
  api.user.respondFriendship(friend, response).then(respondData => {
    dispatch(respondFriendRequestSuccess(respondData));
    dispatch(getFriends());
  });
};

// ---------------- SHOW SET HCP MODAL -----------------
export const shownModal = () => dispatch => dispatch(setShowCompleteSignup());

// ---------------- ADD SCORECARD -----------------
export function addScorecard(data) {
  return dispatch => {
    dispatch(addScorecardBegin());
    return api.user
      .addScorecard(data)
      .then(res => dispatch(addScorecardSuccess(res)))
      .catch(err => {
        dispatch(addScorecardError(err));
      });
  };
}

// ---------------- GET SCORECARDS -----------------
export function getScorecards() {
  return dispatch => {
    dispatch(getScorecardsBegin());
    return api.user
      .getScorecards()
      .then(data => dispatch(getScorecardsSuccess(data)))
      .catch(err => {
        console.log("err");
        console.log(err);
      });
  };
}
