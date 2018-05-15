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
  errors: error.response.data.errors
});

export function addFriend(friend) {
  return dispatch => {
    dispatch(getAddFriendBegin());
    return api.user
      .addFriend(friend)
      .then(userData => dispatch(getAddFriendSuccess(userData)))
      .catch(error => dispatch(getAddFriendError(error)));
  };
}