import api from "../api";
import {
  FRIEND_DATA_REQUESTED,
  FRIEND_DATA_RETRIEVED,
  FRIEND_DATA_FAILED
} from "../types";

// Thunk
export const getFriendsBegin = () => ({
  type: FRIEND_DATA_REQUESTED
});

export const getFriendsSuccess = friendsData => ({
  type: FRIEND_DATA_RETRIEVED,
  payload: friendsData
});

export const geFriendError = error => ({
  type: FRIEND_DATA_FAILED,
  payload: error
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
    return api.user.getFriends(user).then(data => dispatch(getFriendsSuccess(data)));
  };
}

// export const getFriends = user => dispatch => {
//   api.user
//     .getFriends(user)
//     .then(friendsData => {
//       dispatch(getFriendsSuccess(friendsData));
//     })
//     .catch(err => dispatch(handleErrors(err)));
// };
