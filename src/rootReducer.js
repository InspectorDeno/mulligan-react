import { combineReducers } from "redux";
import { reducer as reduxFormReducer } from "redux-form";

import errors from "./reducers/errors";
import user from "./reducers/user";
import counter from "./reducers/counter";
import weather from "./reducers/weather";
import friends from "./reducers/friends";
import golfclub from "./reducers/golfclub";
import golfrounds from "./reducers/golfrounds";

export default combineReducers({
  errors,
  user,
  counter,
  weather,
  friends,
  golfclub,
  golfrounds,
  form: reduxFormReducer
});
