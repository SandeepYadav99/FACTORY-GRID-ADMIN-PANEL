/* eslint-disable indent */
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
// import { createStore, applyMiddleware, compose } from 'redux';
// import thunk from 'redux-thunk';
// // import { logger } from 'redux-logger';
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import {
  setAuthorizationToken,
  setAxiosTimezone,
} from "./libs/set_auth_token.utils";
import store from "./store";
import { AUTH_USER } from "./actions/Auth.action";
import {
  actionChangeTheme,
  actionGetAppSettings,
} from "./actions/AppSettings.action";

setAxiosTimezone();
if (localStorage.theme && false) {
  store.dispatch(actionChangeTheme(localStorage.theme));
} else {
  store.dispatch(actionChangeTheme("light"));
}
if (localStorage.jwt_token) {
  setAuthorizationToken(localStorage.jwt_token);
  store.dispatch({
    type: AUTH_USER,
    payload: {
      ...JSON.parse(localStorage.user),
      token: localStorage.jwt_token,
    },
  });
  // store.dispatch(actionGetDashboard());
  store.dispatch(actionGetAppSettings());
  // connectToSocket(localStorage.jwt_token);
} else {
  // connectToSocket();
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
