import {
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  USER_DATA_REQUESTED,
  USER_DATA_RETRIEVED,
  USER_DATA_FAILED,
  FRIEND_REQUEST_SENT,
  FRIEND_REQUEST_SUCCESS,
  FRIEND_REQUEST_FAILED,
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
  SCORECARD_DATA_FAILED
} from "../types";

const initialState = {
  users: [{
    errors: {}
  }],
  pending: [{
    errors: {}
  }],
  scorecards: [{
    errors: {}
  }],
  shownModal: false,
  loading: false,
  errors: {}
};

export default function user(state = initialState, action = {}) {
  switch (action.type) {
    case USER_LOGGED_IN:
      return action.user;

    case USER_LOGGED_OUT:
      return {};

    case SET_HCP_BEGIN:
      return { ...state, loading: true };
    case SET_HCP_SUCCESS:
      return { ...state, loading: false };
    case SET_HCP_FAILED:
      return { ...state, loading: false, errors: action.errors };

    case USER_DATA_REQUESTED:
      return { ...state, loading: true, users: [] };
    case USER_DATA_RETRIEVED:
      return { ...state, loading: false, users: [action.payload] };
    case USER_DATA_FAILED:
      return { ...state, loading: false, errors: action.errors };

    case FRIEND_DATA_REQUESTED:
      return { ...state, loading: true };
    case FRIEND_DATA_RETRIEVED:
      return { ...state, loading: false, friends: action.payload.data };
    case FRIEND_DATA_FAILED:
      return { ...state, loading: false };

    case FRIEND_REQUEST_SENT:
      return { ...state, loading: true };
    case FRIEND_REQUEST_SUCCESS:
      return { ...state, loading: false, users: [{ ...state.users[0], message: action.payload.message }] };
    case FRIEND_REQUEST_FAILED:
      return { ...state, loading: false, users: [{ ...state.users[0], errors: action.errors }] };

    case SET_SHOW_COMPLETE_SIGNUP:
      return { ...state, shownModal: true };

    case PENDING_DATA_REQUESTED:
      return { ...state, loading: true };
    case PENDING_DATA_RETRIEVED:
      return { ...state, loading: false, pending: action.payload.data };
    case PENDING_DATA_FAILED:
      return { ...state, loading: false, pending: [{ ...state.pending[0], errors: action.errors }] };

    case RESPOND_FRIEND_BEGIN:
      return { ...state, loading: true };
    case RESPOND_FRIEND_SUCCESS:
      return { ...state, loading: false, pending: [{ ...state.pending[0], message: action.payload.message }] };
    case RESPOND_FRIEND_FAILED:
      return { ...state, loading: false, pending: [{ ...state.pending[0], errors: action.errors }] };

    case ADD_SCORECARD_BEGIN:
      return { ...state, loading: true };
    case ADD_SCORECARD_SUCCESS:
      return { ...state, loading: false }
    case ADD_SCORECARD_FAILED:
      return { ...state, loading: false, scorecards: [{ errors: action.errors }] }

    case SCORECARD_DATA_REQUESTED:
      return { ...state, loading: true };
    case SCORECARD_DATA_RETRIEVED:
      return { ...state, loading: false, scorecards: action.payload.data }
    case SCORECARD_DATA_FAILED:
      return { ...state, loading: false, scorecards: [{ errors: action.errors }] }
    default:
      return state;
  }
}
