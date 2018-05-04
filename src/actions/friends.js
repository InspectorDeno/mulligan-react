import api from "../api";
import {
  FRIEND_REQUEST_SENT,
  FRIEND_REQUEST_SUCCESS,
  FRIEND_REQUEST_FAILED
} from "../types";

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

export function addFriend(user, friend) {
  return dispatch => {
    dispatch(getAddFriendBegin());
    return api.user
      .addFriend(user, friend)
      .then(userData => dispatch(getAddFriendSuccess(userData)))
      .catch(error => dispatch(getAddFriendError(error)));
  };
}
