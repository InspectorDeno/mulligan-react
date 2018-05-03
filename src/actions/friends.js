import api from "../api";
import {
  FRIEND_DATA_REQUESTED,
  FRIEND_DATA_RETRIEVED,
  FRIEND_DATA_FAILED,
  FRIEND_REQUEST_SENT,
  FRIEND_REQUEST_SUCCESS,
  FRIEND_REQUEST_FAILED
} from "../types";

// Thunk
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

// Thunk
export const getAddFriendBegin = () => ({
  type: FRIEND_REQUEST_SENT
});

export const getAddFriendSuccess = userData => ({
  type: FRIEND_REQUEST_SUCCESS,
  payload: userData
});

export const getAddFriendError = error => ({
  type: FRIEND_REQUEST_FAILED,
  payload: error.response.data.errors
});

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export function getFriends(user) {
  return dispatch => {
    dispatch(getFriendsBegin());
    return api.user
      .getFriends(user)
      .then(data => dispatch(getFriendsSuccess(data)))
      .catch(error => dispatch(getFriendsError(error)));
  };
}

export function addFriend(user, friend) {
  return dispatch => {
    dispatch(getAddFriendBegin());
    return api.user
      .addFriend(user, friend)
      .then(userData => dispatch(getAddFriendSuccess(userData)))
      .catch(error => dispatch(getAddFriendError(error)));
  };
}
