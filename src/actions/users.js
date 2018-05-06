import api from "../api";
import { userLoggedIn } from "./auth";
import { addError } from "./errorAction";
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
  SET_SHOW_COMPLETE_SIGNUP
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
  errors: error.response.data.errors
});

// Get Friends Thunk
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

export const setHcpBegin = hcp => ({
  type: SET_HCP_BEGIN,
  hcp
});

export const setHcpSuccess = () => ({
  type: SET_HCP_SUCCESS
})

export const setHcpError = error => ({
  type: SET_HCP_FAILED,
  errors: error.response.data.errors
})
export const setShowCompleteSignup = () => ({
  type: SET_SHOW_COMPLETE_SIGNUP,
})



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
      .catch(err => {
        dispatch(addError(err.response.data.errors));
        dispatch(getFindUserError(err));
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
      .catch(err => {
        dispatch(addError(err.response.data.errors));
        dispatch(getFriendsError());
        // TODO: This shouldn't really dispatch an error imo, we just don't have any friends...
      });
  };
}

export const setHcp = (user, hcp) => dispatch => {
  dispatch(setHcpBegin());
  api.user.setHcp(user, hcp).then(updatedUser => {
      localStorage.mulliganJWT = updatedUser.token;
      dispatch(setHcpSuccess());
  })
}

  export const shownModal = () => dispatch => dispatch(setShowCompleteSignup());


// export function setHcp(user, hcp) {
//   return dispatch => {
//     dispatch(setHcpBegin());
//     return api.user.setHcp(user,hcp)
//     .then(updatedUser => {
//       localStorage.mulliganJWT = updatedUser.token;
//       dispatch(setHcpSuccess());
//     })
//   }
