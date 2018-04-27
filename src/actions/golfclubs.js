import api from "../api";
import {
  GOLFCLUB_DATA_REQUESTED,
  GOLFCLUB_DATA_RETRIEVED,
  GOLFCLUB_DATA_FAILED
} from "../types";

// Thunk
export const getGolfClubBegin = () => ({
  type: GOLFCLUB_DATA_REQUESTED
});

export const getGolfClubSucces = golfClubData => ({
  type: GOLFCLUB_DATA_RETRIEVED,
  payload: golfClubData
});

export const getGolfClubError = error => ({
  type: GOLFCLUB_DATA_FAILED,
  payload: error.response.data.error
});

export function getGolfClub(clubName) {
  return dispatch => {
    dispatch(getGolfClubBegin());
    return api.golfclub
      .findClub(clubName)
      .then(data => dispatch(getGolfClubSucces(data)))
      .catch(err => {
        dispatch(getGolfClubError(err));
      });
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
