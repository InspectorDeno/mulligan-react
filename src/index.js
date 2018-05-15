import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import "semantic-ui-css/semantic.min.css";
import thunk from "redux-thunk";
import decode from "jwt-decode";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import rootReducer from "./rootReducer";
import { userLoggedIn } from "./actions/auth";
import setAuthorizationHeader from "./utils/setAuthorizationHeader";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

// Dispatches USER_LOGGED_IN action if we have a local webstorage (for refresh)
if (localStorage.mulliganJWT) {
  const payload = decode(localStorage.mulliganJWT);
  console.log(payload);
  const user = {
    email: payload.email,
    username: payload.username,
    gender: payload.gender,
    hcp: payload.hcp,
    confirmed: payload.confirmed,
    token: localStorage.mulliganJWT
  };
  setAuthorizationHeader(localStorage.mulliganJWT);
  store.dispatch(userLoggedIn(user));
}

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Route component={App} />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
registerServiceWorker();
