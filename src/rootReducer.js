import { combineReducers } from "redux";
import { reducer as reduxFormReducer } from "redux-form";

import user from "./reducers/user";
import counter from "./reducers/counter";
import weather from "./reducers/weather";
import friends from "./reducers/friends";
import golfclub from "./reducers/golfclub";

export default combineReducers({
  user,
  counter,
  weather,
  friends,
  golfclub,
  form: reduxFormReducer
});
