import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import jwt_decode from "jwt-decode";

import { actions as authActions } from "reducers/auth";
import { setAuthToken, clearAuthToken } from "utils";
import rootReducer from "reducers";
import rootSaga from "sagas";
import App from "./App";
import "react-multi-carousel/lib/styles.css";
import "./index.css";
import "./_utils.css";
import * as serviceWorker from "./serviceWorker";

const initialState = {};
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];
const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    process.env.NODE_ENV === "production"
      ? (f) => f
      : window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(authActions.setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (currentTime > decoded.exp) {
    clearAuthToken();
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

sagaMiddleware.run(rootSaga);
serviceWorker.register();
