import { combineReducers } from "redux";

import user from "./reducers/user";
import counter from "./reducers/counter";

export default combineReducers({
  user,
  counter
});
