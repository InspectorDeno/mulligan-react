import { combineReducers } from "redux";

import user from "./reducers/user";
import counter from "./reducers/counter";
import weather from "./reducers/weather";

export default combineReducers({
  user,
  counter,
  weather
});
