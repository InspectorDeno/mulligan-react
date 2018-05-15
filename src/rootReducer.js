import { combineReducers } from "redux";
import { reducer as reduxFormReducer } from "redux-form";

import errors from "./reducers/errors";
import user from "./reducers/user";
import weather from "./reducers/weather";
import friends from "./reducers/friends";
import golfclub from "./reducers/golfclub";

export default combineReducers({
  errors,
  user,
  weather,
  friends,
  golfclub,
  form: reduxFormReducer
});
