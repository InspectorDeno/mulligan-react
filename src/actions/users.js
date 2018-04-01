import api from "../api";
import { userLoggedIn } from "./auth";

// API Calls
export const signup = data => dispatch =>
  api.user.signup(data).then(user => {
    localStorage.mulliganJWT = user.token;
    dispatch(userLoggedIn(user));
  });
