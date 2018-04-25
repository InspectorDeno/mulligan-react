// import api from "../api";
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

export function getFriends() {
    return dispatch => {
        dispatch(getFriendsBegin());
        return fetch("/api/friends/find")
            .then(handleErrors)
            .then(res => res.json())
            .then(json => {
                dispatch(getFriendsSuccess(json));
                return json.friendsData;
            });
    };
}
